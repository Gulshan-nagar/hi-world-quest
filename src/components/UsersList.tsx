import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface Profile {
  id: string;
  full_name: string;
  bio: string;
  skills: string;
}

interface UsersListProps {
  currentUserId: string;
}

const UsersList = ({ currentUserId }: UsersListProps) => {
  const [users, setUsers] = useState<Profile[]>([]);

  useEffect(() => {
    loadUsers();
  }, [currentUserId]);

  const loadUsers = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from("profiles")
        .select("*")
        .neq("id", currentUserId);

      if (error) throw error;
      setUsers(data || []);
    } catch (error: any) {
      if (import.meta.env.DEV) {
        console.error("Error loading users:", error);
      }
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

  return (
    <Card className="bg-card/80 backdrop-blur border-border shadow-card h-full overflow-hidden flex flex-col">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-3">
          {users.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No other users yet
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <Avatar className="w-10 h-10 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {getInitials(user.full_name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{user.full_name || "Anonymous"}</p>
                  {user.skills && (
                    <p className="text-xs text-muted-foreground truncate">{user.skills}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList;