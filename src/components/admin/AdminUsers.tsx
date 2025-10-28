import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Ban, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  full_name: string;
  email: string;
  created_at: string;
  is_blocked: boolean;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, created_at")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

      if (authError) throw authError;

      const { data: blocks } = await supabase
        .from("user_blocks")
        .select("user_id")
        .is("unblocked_at", null);

      const blockedIds = new Set(blocks?.map((b) => b.user_id) || []);

      const usersWithEmail = (profiles || []).map((profile) => {
        const authUser = authUsers.find((u) => u.id === profile.id);
        return {
          id: profile.id,
          full_name: profile.full_name || "Unknown",
          email: authUser?.email || "N/A",
          created_at: profile.created_at,
          is_blocked: blockedIds.has(profile.id),
        };
      });

      setUsers(usersWithEmail);
    } catch (error) {
      console.error("Error loading users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId: string, currentlyBlocked: boolean) => {
    try {
      const { data: { user: admin } } = await supabase.auth.getUser();
      if (!admin) return;

      if (currentlyBlocked) {
        const { error } = await supabase
          .from("user_blocks")
          .update({ unblocked_at: new Date().toISOString() })
          .eq("user_id", userId)
          .is("unblocked_at", null);

        if (error) throw error;

        toast({
          title: "User Unblocked",
          description: "User has been unblocked successfully",
        });
      } else {
        const { error } = await supabase.from("user_blocks").insert({
          user_id: userId,
          blocked_by: admin.id,
          reason: "Blocked by admin",
        });

        if (error) throw error;

        toast({
          title: "User Blocked",
          description: "User has been blocked successfully",
        });
      }

      loadUsers();
    } catch (error) {
      console.error("Error toggling user block:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
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

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading users...</div>;
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border">
      <CardContent className="p-6">
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(user.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{user.full_name}</p>
                    {user.is_blocked && (
                      <Badge variant="destructive" className="text-xs">
                        Blocked
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button
                variant={user.is_blocked ? "outline" : "destructive"}
                size="sm"
                onClick={() => handleBlockUser(user.id, user.is_blocked)}
                className="gap-2"
              >
                {user.is_blocked ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Unblock
                  </>
                ) : (
                  <>
                    <Ban className="w-4 h-4" />
                    Block
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUsers;
