import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Feedback {
  id: string;
  rating: number;
  feedback_text: string;
  created_at: string;
  user_name: string;
}

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from("call_feedback")
        .select("id, rating, feedback_text, created_at, user_id")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const feedbackWithNames = await Promise.all(
        (data || []).map(async (fb) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", fb.user_id)
            .single();

          return {
            id: fb.id,
            rating: fb.rating,
            feedback_text: fb.feedback_text || "",
            created_at: fb.created_at,
            user_name: profile?.full_name || "Unknown",
          };
        })
      );

      setFeedback(feedbackWithNames);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error loading feedback:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading feedback...</div>;
  }

  if (feedback.length === 0) {
    return (
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardContent className="p-8 text-center text-muted-foreground">
          No feedback yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {feedback.map((fb) => (
            <div
              key={fb.id}
              className="p-4 rounded-lg bg-background/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{fb.user_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(fb.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {fb.rating}/5
                </Badge>
              </div>
              {fb.feedback_text && (
                <p className="text-sm text-muted-foreground">{fb.feedback_text}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminFeedback;
