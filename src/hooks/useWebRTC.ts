import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UseWebRTCProps {
  callId: string | null;
  isInitiator: boolean;
  onCallEnd: () => void;
}

export const useWebRTC = ({ callId, isInitiator, onCallEnd }: UseWebRTCProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [connectionState, setConnectionState] = useState<string>("new");
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!callId) return;

    const initWebRTC = async () => {
      try {
        // Get user media
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true, 
          video: false 
        });
        localStream.current = stream;

        // Create peer connection
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" },
          ],
        });

        peerConnection.current = pc;

        // Add local tracks
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Handle remote stream
        pc.ontrack = (event) => {
          remoteStream.current = event.streams[0];
          const audioElement = document.getElementById("remote-audio") as HTMLAudioElement;
          if (audioElement) {
            audioElement.srcObject = event.streams[0];
          }
        };

        // Handle ICE candidates
        pc.onicecandidate = async (event) => {
          if (event.candidate) {
            const user = await supabase.auth.getUser();
            if (user.data.user?.id) {
              await (supabase as any).from("call_signals" as any).insert({
                call_id: callId,
                sender_id: user.data.user.id,
                signal_type: "ice-candidate",
                signal_data: event.candidate.toJSON() as any,
              });
            }
          }
        };

        // Monitor connection state
        pc.onconnectionstatechange = () => {
          setConnectionState(pc.connectionState);
          if (pc.connectionState === "failed" || pc.connectionState === "closed") {
            onCallEnd();
          }
        };

        // If initiator, create offer
        if (isInitiator) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);
          const user = await supabase.auth.getUser();
          if (user.data.user?.id) {
            await (supabase as any).from("call_signals" as any).insert({
              call_id: callId,
              sender_id: user.data.user.id,
              signal_type: "offer",
              signal_data: offer as any,
            });
          }
        }

        // Listen for signals
        const channel = supabase
          .channel(`call-signals-${callId}`)
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "call_signals",
              filter: `call_id=eq.${callId}`,
            },
            async (payload: any) => {
              const signal = payload.new;
              const currentUserId = (await supabase.auth.getUser()).data.user?.id;
              
              // Ignore own signals
              if (signal.sender_id === currentUserId) return;

              if (signal.signal_type === "offer") {
                await pc.setRemoteDescription(new RTCSessionDescription(signal.signal_data as any));
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                if (currentUserId) {
                  await (supabase as any).from("call_signals" as any).insert({
                    call_id: callId,
                    sender_id: currentUserId,
                    signal_type: "answer",
                    signal_data: answer as any,
                  });
                }
              } else if (signal.signal_type === "answer") {
                await pc.setRemoteDescription(new RTCSessionDescription(signal.signal_data as any));
              } else if (signal.signal_type === "ice-candidate") {
                await pc.addIceCandidate(new RTCIceCandidate(signal.signal_data as any));
              }
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("WebRTC initialization error:", error);
        }
        onCallEnd();
      }
    };

    initWebRTC();

    return () => {
      // Cleanup
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [callId, isInitiator, onCallEnd]);

  const toggleMute = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const endCall = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    onCallEnd();
  };

  return { isMuted, toggleMute, endCall, connectionState };
};
