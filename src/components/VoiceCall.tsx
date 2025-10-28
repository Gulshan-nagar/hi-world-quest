import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useToast } from "@/hooks/use-toast";

interface VoiceCallProps {
  callId: string;
  isInitiator: boolean;
  partnerId: string;
  onEndCall: () => void;
}

const VoiceCall = ({ callId, isInitiator, partnerId, onEndCall }: VoiceCallProps) => {
  const [partnerName, setPartnerName] = useState<string>("Unknown User");
  const { toast } = useToast();
  const { isMuted, toggleMute, endCall, connectionState } = useWebRTC({
    callId,
    isInitiator,
    onCallEnd: handleCallEnd,
  });

  useEffect(() => {
    loadPartnerName();
  }, [partnerId]);

  const loadPartnerName = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", partnerId)
        .single();

      if (error) throw error;
      if (data) {
        setPartnerName(data.full_name || "Anonymous");
      }
    } catch (error) {
      console.error("Error loading partner name:", error);
    }
  };

  async function handleCallEnd() {
    try {
      await supabase
        .from("calls")
        .update({ status: "ended", ended_at: new Date().toISOString() })
        .eq("id", callId);

      toast({
        title: "Call ended",
        description: "The voice call has been disconnected.",
      });
      onEndCall();
    } catch (error) {
      console.error("Error ending call:", error);
      onEndCall();
    }
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border shadow-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary animate-pulse" />
          Voice Call
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center py-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            <Phone className="w-12 h-12 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Connected with {partnerName}</h3>
          <p className="text-sm text-muted-foreground capitalize">
            Status: {connectionState}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="lg"
            onClick={toggleMute}
            className="gap-2"
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            {isMuted ? "Unmute" : "Mute"}
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={endCall}
            className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            <PhoneOff className="w-5 h-5" />
            End Call
          </Button>
        </div>

        {/* Hidden audio element for remote stream */}
        <audio id="remote-audio" autoPlay />
      </CardContent>
    </Card>
  );
};

export default VoiceCall;
