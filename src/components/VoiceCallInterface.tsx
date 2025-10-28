import { Phone, PhoneOff, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useVoiceCall } from "@/hooks/useVoiceCall";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PostCallActions from "@/components/PostCallActions";

interface VoiceCallInterfaceProps {
  currentUserId: string;
}

const VoiceCallInterface = ({ currentUserId }: VoiceCallInterfaceProps) => {
  const { callState, startMatchmaking, cancelMatchmaking, endCall, closePostCall, toggleMute } =
    useVoiceCall(currentUserId);

  const getStatusText = () => {
    switch (callState.status) {
      case "searching":
        return "Searching for a call partner...";
      case "connecting":
        return `Connecting with ${callState.partnerName}...`;
      case "active":
        return `Connected with ${callState.partnerName}`;
      default:
        return "Ready to start a call";
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (callState.status === "idle") {
    return (
      <div className="fixed bottom-24 right-6 z-50">
        <Button
          onClick={startMatchmaking}
          className="h-16 px-8 bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg font-bold shadow-elegant"
        >
          <Phone className="w-6 h-6 mr-3" />
          Start Voice Call
        </Button>
      </div>
    );
  }

  if (callState.status === "post-call" && callState.callId && callState.partnerId && callState.partnerName) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-96">
        <PostCallActions
          callId={callState.callId}
          partnerId={callState.partnerId}
          partnerName={callState.partnerName}
          currentUserId={currentUserId}
          onClose={closePostCall}
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <Card className="bg-card/95 backdrop-blur border-border shadow-glow w-80">
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            {/* Status indicator */}
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-primary/30">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {getInitials(callState.partnerName)}
                </AvatarFallback>
              </Avatar>
              {callState.status === "active" && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-pulse border-2 border-background" />
              )}
            </div>

            {/* Status text */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                {callState.status === "searching" && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                {getStatusText()}
              </p>
            </div>

            {/* Call controls */}
            <div className="flex gap-3">
              {callState.status === "searching" ? (
                <Button
                  onClick={cancelMatchmaking}
                  variant="destructive"
                  size="lg"
                  className="gap-2"
                >
                  <PhoneOff className="w-5 h-5" />
                  Cancel
                </Button>
              ) : (
                <>
                  <Button
                    onClick={toggleMute}
                    variant={callState.isMuted ? "destructive" : "secondary"}
                    size="lg"
                  >
                    {callState.isMuted ? (
                      <MicOff className="w-5 h-5" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </Button>
                  <Button
                    onClick={endCall}
                    variant="destructive"
                    size="lg"
                    className="gap-2"
                  >
                    <PhoneOff className="w-5 h-5" />
                    End Call
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <audio id="remote-audio" autoPlay />
    </div>
  );
};

export default VoiceCallInterface;
