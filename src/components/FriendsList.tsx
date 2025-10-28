import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserPlus, Check, X, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FriendRequest {
  id: string;
  sender_id: string;
  sender_name: string;
  created_at: string;
}

interface Friend {
  id: string;
  name: string;
  user_id: string;
}

interface FriendsListProps {
  currentUserId: string;
}

const FriendsList = ({ currentUserId }: FriendsListProps) => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFriendRequests();
    loadFriends();

    const requestsChannel = supabase
      .channel("friend-requests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friend_requests",
          filter: `receiver_id=eq.${currentUserId}`,
        },
        () => {
          loadFriendRequests();
        }
      )
      .subscribe();

    const friendshipsChannel = supabase
      .channel("friendships")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "friendships",
        },
        () => {
          loadFriends();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(requestsChannel);
      supabase.removeChannel(friendshipsChannel);
    };
  }, [currentUserId]);

  const loadFriendRequests = async () => {
    const { data, error } = await supabase
      .from("friend_requests")
      .select("id, sender_id, created_at")
      .eq("receiver_id", currentUserId)
      .eq("status", "pending");

    if (error) {
      if (import.meta.env.DEV) {
        console.error("Error loading friend requests:", error);
      }
      return;
    }

    const requestsWithNames = await Promise.all(
      (data || []).map(async (req) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", req.sender_id)
          .single();

        return {
          id: req.id,
          sender_id: req.sender_id,
          sender_name: profile?.full_name || "Unknown",
          created_at: req.created_at,
        };
      })
    );

    setFriendRequests(requestsWithNames);
  };

  const loadFriends = async () => {
    const { data, error } = await supabase
      .from("friendships")
      .select("user_id_1, user_id_2")
      .or(`user_id_1.eq.${currentUserId},user_id_2.eq.${currentUserId}`);

    if (error) {
      if (import.meta.env.DEV) {
        console.error("Error loading friends:", error);
      }
      return;
    }

    const friendIds = (data || []).map((f) =>
      f.user_id_1 === currentUserId ? f.user_id_2 : f.user_id_1
    );

    const friendsWithNames = await Promise.all(
      friendIds.map(async (friendId) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", friendId)
          .single();

        return {
          id: friendId,
          name: profile?.full_name || "Unknown",
          user_id: friendId,
        };
      })
    );

    setFriends(friendsWithNames);
  };

  const handleAcceptRequest = async (requestId: string, senderId: string) => {
    try {
      const { error } = await supabase
        .from("friend_requests")
        .update({ status: "accepted" })
        .eq("id", requestId);

      if (error) throw error;

      // Also send a request back if not already sent
      await supabase.from("friend_requests").insert({
        sender_id: currentUserId,
        receiver_id: senderId,
        status: "accepted",
      }).select();

      toast({
        title: "Friend Added",
        description: "You are now friends!",
      });

      loadFriendRequests();
      loadFriends();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error accepting request:", error);
      }
      toast({
        title: "Error",
        description: "Failed to accept friend request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from("friend_requests")
        .update({ status: "rejected" })
        .eq("id", requestId);

      if (error) throw error;

      loadFriendRequests();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error rejecting request:", error);
      }
      toast({
        title: "Error",
        description: "Failed to reject friend request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-4">
      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <Card className="bg-card/80 backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserPlus className="w-4 h-4" />
              Friend Requests
              <Badge variant="secondary">{friendRequests.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {friendRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                      {getInitials(request.sender_name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{request.sender_name}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      handleAcceptRequest(request.id, request.sender_id)
                    }
                    className="bg-gradient-primary hover:shadow-glow transition-all"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRejectRequest(request.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Friends List */}
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="w-4 h-4" />
            Friends
            <Badge variant="secondary">{friends.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No friends yet. Start a call to connect!
            </p>
          ) : (
            <div className="space-y-2">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                      {getInitials(friend.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{friend.name}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FriendsList;
