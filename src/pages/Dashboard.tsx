import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { MessageCircle, LogOut, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ChatPanel from "@/components/ChatPanel";
import UsersList from "@/components/UsersList";
import MatchmakingPanel from "@/components/MatchmakingPanel";
import VoiceCall from "@/components/VoiceCall";
import VoiceCallInterface from "@/components/VoiceCallInterface";
import FriendsList from "@/components/FriendsList";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState<{
    callId: string;
    isInitiator: boolean;
    partnerId: string;
  } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleCallStart = (callId: string, isInitiator: boolean, partnerId: string) => {
    setActiveCall({ callId, isInitiator, partnerId });
  };

  const handleCallEnd = () => {
    setActiveCall(null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PeerUp
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/profile")}
              className="gap-2"
            >
              <UserIcon className="w-4 h-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[300px_1fr] gap-6 h-[calc(100vh-120px)]">
          {/* Sidebar */}
          <div className="space-y-4 overflow-y-auto">
            {/* Friends List */}
            <FriendsList currentUserId={user?.id || ""} />
            
            {/* Users List */}
            <UsersList currentUserId={user?.id || ""} />
            
            {/* Matchmaking Panel */}
            {!activeCall && (
              <MatchmakingPanel 
                currentUserId={user?.id || ""} 
                onCallStart={handleCallStart}
              />
            )}
            
            {/* Active Call */}
            {activeCall && (
              <VoiceCall
                callId={activeCall.callId}
                isInitiator={activeCall.isInitiator}
                partnerId={activeCall.partnerId}
                onEndCall={handleCallEnd}
              />
            )}
          </div>

          {/* Chat Panel */}
          <ChatPanel currentUserId={user?.id || ""} />
        </div>
      </div>

      {/* Voice Call Interface */}
      <VoiceCallInterface currentUserId={user?.id || ""} />
    </div>
  );
};

export default Dashboard;