import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CallState {
  callId: string | null;
  partnerId: string | null;
  partnerName: string | null;
  status: "idle" | "searching" | "connecting" | "active" | "ended" | "post-call";
  isMuted: boolean;
}

const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ],
};

export const useVoiceCall = (currentUserId: string) => {
  const [callState, setCallState] = useState<CallState>({
    callId: null,
    partnerId: null,
    partnerName: null,
    status: "idle",
    isMuted: false,
  });

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  // Setup WebRTC peer connection
  const setupPeerConnection = async (callId: string, isInitiator: boolean) => {
    try {
      // Get user media
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // Create peer connection
      peerConnection.current = new RTCPeerConnection(ICE_SERVERS);

      // Add local stream
      localStream.current.getTracks().forEach((track) => {
        peerConnection.current!.addTrack(track, localStream.current!);
      });

      // Handle remote stream
      peerConnection.current.ontrack = (event) => {
        const remoteAudio = new Audio();
        remoteAudio.srcObject = event.streams[0];
        remoteAudio.play();
      };

      // Handle ICE candidates
      peerConnection.current.onicecandidate = async (event) => {
        if (event.candidate) {
          await supabase.from("call_signals").insert({
            call_id: callId,
            sender_id: currentUserId,
            signal_type: "ice-candidate",
            signal_data: event.candidate.toJSON() as any,
          } as any);
        }
      };

      // Create offer if initiator
      if (isInitiator) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        await supabase.from("call_signals").insert({
          call_id: callId,
          sender_id: currentUserId,
          signal_type: "offer",
          signal_data: offer as any,
        } as any);
      }

      setCallState((prev) => ({ ...prev, status: "active" }));
    } catch (error) {
      console.error("Error setting up peer connection:", error);
      toast({
        title: "Connection Error",
        description: "Failed to establish voice connection",
        variant: "destructive",
      });
    }
  };

  // Start matchmaking
  const startMatchmaking = async () => {
    try {
      setCallState((prev) => ({ ...prev, status: "searching" }));

      // Add to matchmaking queue
      const { error: queueError } = await supabase
        .from("matchmaking_queue")
        .insert({ user_id: currentUserId });

      if (queueError) {
        throw queueError;
      }

      toast({
        title: "Searching...",
        description: "Looking for a call partner",
      });

      // Check for existing users in queue
      const { data: queueUsers, error: fetchError } = await supabase
        .from("matchmaking_queue")
        .select("user_id")
        .neq("user_id", currentUserId)
        .limit(1)
        .single();

      if (!fetchError && queueUsers) {
        // Match found! Create call
        const partnerId = queueUsers.user_id;

        // Remove both from queue
        await supabase
          .from("matchmaking_queue")
          .delete()
          .in("user_id", [currentUserId, partnerId]);

        // Create call record
        const { data: call, error: callError } = await supabase
          .from("calls")
          .insert({
            caller_id: currentUserId,
            callee_id: partnerId,
            status: "active",
          })
          .select()
          .single();

        if (callError) throw callError;

        // Get partner profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", partnerId)
          .single();

        setCallState((prev) => ({
          ...prev,
          callId: call.id,
          partnerId,
          partnerName: profile?.full_name || "Unknown",
          status: "connecting",
        }));

        await setupPeerConnection(call.id, true);
      }
    } catch (error: any) {
      console.error("Error in matchmaking:", error);
      setCallState((prev) => ({ ...prev, status: "idle" }));
      toast({
        title: "Matchmaking Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Cancel matchmaking
  const cancelMatchmaking = async () => {
    await supabase
      .from("matchmaking_queue")
      .delete()
      .eq("user_id", currentUserId);

    setCallState((prev) => ({ ...prev, status: "idle" }));
  };

  // End call and show post-call actions
  const endCall = async () => {
    if (callState.callId) {
      // Update call status
      await supabase
        .from("calls")
        .update({ status: "ended", ended_at: new Date().toISOString() })
        .eq("id", callState.callId);

      // Notify the other user that call ended via realtime
      await supabase
        .from("call_signals")
        .insert({
          call_id: callState.callId,
          sender_id: currentUserId,
          signal_type: "call-ended",
          signal_data: { reason: "user_disconnect" } as any,
        } as any);

      // Close peer connection
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // Stop local stream
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
        localStream.current = null;
      }
    }

    // Change to post-call state instead of idle
    setCallState((prev) => ({
      ...prev,
      status: "post-call",
    }));
  };

  // Close post-call actions
  const closePostCall = () => {
    setCallState({
      callId: null,
      partnerId: null,
      partnerName: null,
      status: "idle",
      isMuted: false,
    });

    toast({
      title: "Call Ended",
      description: "The call has been disconnected",
    });
  };

  // Toggle mute
  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = callState.isMuted;
      });
      setCallState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
    }
  };

  // Listen for matchmaking updates
  useEffect(() => {
    const channel = supabase
      .channel("matchmaking")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "calls",
          filter: `callee_id=eq.${currentUserId}`,
        },
        async (payload) => {
          const call = payload.new;

          // Get caller profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", call.caller_id)
            .single();

          setCallState({
            callId: call.id,
            partnerId: call.caller_id,
            partnerName: profile?.full_name || "Unknown",
            status: "connecting",
            isMuted: false,
          });

          await setupPeerConnection(call.id, false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);

  // Listen for call signals
  useEffect(() => {
    if (!callState.callId) return;

    const channel = supabase
      .channel(`call-signals-${callState.callId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "call_signals",
          filter: `call_id=eq.${callState.callId}`,
        },
        async (payload) => {
          const signal = payload.new;

          // Ignore own signals
          if (signal.sender_id === currentUserId) return;

          if (!peerConnection.current) return;

          try {
            if (signal.signal_type === "offer") {
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(signal.signal_data)
              );

              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);

              await supabase.from("call_signals").insert({
                call_id: callState.callId,
                sender_id: currentUserId,
                signal_type: "answer",
                signal_data: answer as any,
              } as any);
            } else if (signal.signal_type === "answer") {
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(signal.signal_data)
              );
            } else if (signal.signal_type === "ice-candidate") {
              await peerConnection.current.addIceCandidate(
                new RTCIceCandidate(signal.signal_data)
              );
            } else if (signal.signal_type === "call-ended") {
              // Other user ended the call - clean up and show post-call
              if (peerConnection.current) {
                peerConnection.current.close();
                peerConnection.current = null;
              }
              if (localStream.current) {
                localStream.current.getTracks().forEach((track) => track.stop());
                localStream.current = null;
              }
              setCallState((prev) => ({
                ...prev,
                status: "post-call",
              }));
              toast({
                title: "Call Ended",
                description: "The other user has disconnected",
              });
            }
          } catch (error) {
            if (import.meta.env.DEV) {
              console.error("Error handling signal:", error);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [callState.callId, currentUserId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callState.status === "searching") {
        cancelMatchmaking();
      } else if (callState.status === "active" || callState.status === "connecting") {
        endCall();
      }
    };
  }, []);

  return {
    callState,
    startMatchmaking,
    cancelMatchmaking,
    endCall,
    closePostCall,
    toggleMute,
  };
};
