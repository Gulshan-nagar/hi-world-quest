import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Report {
  id: string;
  reporter_name: string;
  reported_name: string;
  reason: string;
  status: string;
  created_at: string;
}

interface AdminReportsProps {
  onStatsUpdate: () => void;
}

const AdminReports = ({ onStatsUpdate }: AdminReportsProps) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from("user_reports")
        .select("id, reporter_id, reported_id, reason, status, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const reportsWithNames = await Promise.all(
        (data || []).map(async (report) => {
          const [reporter, reported] = await Promise.all([
            supabase.from("profiles").select("full_name").eq("id", report.reporter_id).single(),
            supabase.from("profiles").select("full_name").eq("id", report.reported_id).single(),
          ]);

          return {
            id: report.id,
            reporter_name: reporter.data?.full_name || "Unknown",
            reported_name: reported.data?.full_name || "Unknown",
            reason: report.reason,
            status: report.status,
            created_at: report.created_at,
          };
        })
      );

      setReports(reportsWithNames);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error loading reports:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("user_reports")
        .update({ status: newStatus })
        .eq("id", reportId);

      if (error) throw error;

      toast({
        title: "Report Updated",
        description: `Report marked as ${newStatus}`,
      });

      loadReports();
      onStatsUpdate();
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error updating report:", error);
      }
      toast({
        title: "Error",
        description: "Failed to update report",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading reports...</div>;
  }

  if (reports.length === 0) {
    return (
      <Card className="bg-card/80 backdrop-blur border-border">
        <CardContent className="p-8 text-center text-muted-foreground">
          No reports yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 backdrop-blur border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-lg bg-background/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{report.reporter_name}</p>
                    <span className="text-muted-foreground">reported</span>
                    <p className="font-medium">{report.reported_name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reason: {report.reason}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(report.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge
                  variant={
                    report.status === "pending"
                      ? "destructive"
                      : report.status === "reviewed"
                      ? "secondary"
                      : "default"
                  }
                >
                  {report.status}
                </Badge>
              </div>

              {report.status === "pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdateStatus(report.id, "reviewed")}
                    className="gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Mark Reviewed
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateStatus(report.id, "resolved")}
                    className="gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Resolved
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReports;
