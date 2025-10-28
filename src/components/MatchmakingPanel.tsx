import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MatchmakingPanelProps {
  currentUserId: string;
  onCallStart: (callId: string, isInitiator: boolean, partnerId: string) => void;
}

const MatchmakingPanel = ({ currentUserId, onCallStart }: MatchmakingPanelProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Listen for new calls where user is the callee
    const channel = supabase
      .channel("incoming-calls")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "calls",
          filter: `callee_id=eq.${currentUserId}`,
        },
        (payload: any) => {
          const call = payload.new;
          if (call.status === "active") {
            onCallStart(call.id, false, call.caller_id);
            setIsSearching(false);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, onCallStart]);

  const findCallPartner = async () => {
    setIsSearching(true);
    
    try {
      // Add user to matchmaking queue
      const { error: queueError } = await (supabase as any)
        .from("matchmaking_queue")
        .insert({ user_id: currentUserId });

      if (queueError && queueError.code !== "23505") {
        // 23505 is unique violation - user already in queue
        throw queueError;
      }

      // Check for available partners
      const { data: queue, error: fetchError } = await (supabase as any)
        .from("matchmaking_queue")
        .select("user_id")
        .neq("user_id", currentUserId)
        .order("created_at", { ascending: true })
        .limit(1);

      if (fetchError) throw fetchError;

      if (queue && queue.length > 0) {
        const partnerId = queue[0].user_id;

        // Create call
        const { data: call, error: callError } = await (supabase as any)
          .from("calls")
          .insert({
            caller_id: currentUserId,
            callee_id: partnerId,
            status: "active",
          })
          .select()
          .single();

        if (callError) throw callError;

        // Remove both users from queue
        await (supabase as any)
          .from("matchmaking_queue")
          .delete()
          .in("user_id", [currentUserId, partnerId]);

        toast({
          title: "Partner found!",
          description: "Connecting to voice call...",
        });

        onCallStart(call.id, true, partnerId);
        setIsSearching(false);
      } else {
        toast({
          title: "Searching...",
          description: "Waiting for a call partner to join.",
        });
      }
    } catch (error: any) {
      console.error("Matchmaking error:", error);
      toast({
        title: "Error",
        description: "Failed to find a call partner",
        variant: "destructive",
      });
      setIsSearching(false);
      
      // Remove from queue on error
      await (supabase as any)
        .from("matchmaking_queue")
        .delete()
        .eq("user_id", currentUserId);
    }
  };

  const cancelSearch = async () => {
    try {
      await (supabase as any)
        .from("matchmaking_queue" as any)
        .delete()
        .eq("user_id", currentUserId);

      setIsSearching(false);
      toast({
        title: "Search cancelled",
        description: "You've been removed from the queue.",
      });
    } catch (error) {
      console.error("Error cancelling search:", error);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Voice Calls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Connect with other users through instant voice calls. Click below to find a call partner.
        </p>
        
        {!isSearching ? (
          <Button
            onClick={findCallPartner}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all gap-2"
            size="lg"
          >
            <Phone className="w-5 h-5" />
            Find Call Partner
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Searching for a partner...</span>
            </div>
            <Button
              onClick={cancelSearch}
              variant="outline"
              className="w-full"
            >
              Cancel Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchmakingPanel;
