import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Star, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PostCallActionsProps {
  callId: string;
  partnerId: string;
  partnerName: string;
  currentUserId: string;
  onClose: () => void;
}

const PostCallActions = ({
  callId,
  partnerId,
  partnerName,
  currentUserId,
  onClose,
}: PostCallActionsProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleAddFriend = async () => {
    try {
      const { error } = await (supabase as any).from("friend_requests").insert({
        sender_id: currentUserId,
        receiver_id: partnerId,
        status: "pending",
      });

      if (error) {
        if (import.meta.env.DEV) {
          console.error("Error sending friend request:", error);
        }
        throw error;
      }

      toast({
        title: "Friend Request Sent",
        description: `Your friend request has been sent to ${partnerName}`,
      });
    } catch (error: any) {
      if (error.code === "23505") {
        toast({
          title: "Already Sent",
          description: "You've already sent a friend request to this user",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send friend request",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmitFeedback = async () => {
    // Validate feedback length
    const trimmedFeedback = feedback.trim();
    if (trimmedFeedback.length > 500) {
      toast({
        title: "Error",
        description: "Feedback is too long. Maximum 500 characters.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await (supabase as any).from("call_feedback").insert({
        call_id: callId,
        user_id: currentUserId,
        rating,
        feedback_text: trimmedFeedback || null,
      });

      if (error) {
        if (import.meta.env.DEV) {
          console.error("Error submitting feedback:", error);
        }
        throw error;
      }

      setSubmitted(true);
      toast({
        title: "Thank You!",
        description: "Your feedback has been submitted",
      });

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <Card className="bg-card/95 backdrop-blur border-border shadow-glow animate-scale-in">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
          <p className="text-muted-foreground">
            Your feedback helps us improve
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/95 backdrop-blur border-border shadow-glow animate-fade-in">
      <CardHeader>
        <CardTitle className="text-center">Call Ended</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Friend Section */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Had a great conversation with {partnerName}?
          </p>
          <Button
            onClick={handleAddFriend}
            className="w-full bg-gradient-primary hover:shadow-glow transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add as Friend
          </Button>
        </div>

        {/* Feedback Section */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-center">Rate this call</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Share your feedback (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="resize-none"
            rows={3}
          />

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              onClick={handleSubmitFeedback}
              disabled={rating === 0}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-all"
            >
              Submit Feedback
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCallActions;
