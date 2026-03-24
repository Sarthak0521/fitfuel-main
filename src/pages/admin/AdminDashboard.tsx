import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Dumbbell, Pill, Utensils, FileText, MessageSquare, Users } from "lucide-react";

interface Stats {
  workouts: number;
  supplements: number;
  mealPlans: number;
  blogPosts: number;
  contacts: number;
  unreadContacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    workouts: 0,
    supplements: 0,
    mealPlans: 0,
    blogPosts: 0,
    contacts: 0,
    unreadContacts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [workouts, supplements, mealPlans, blogPosts, contacts, unreadContacts] = await Promise.all([
        supabase.from("workouts").select("id", { count: "exact", head: true }),
        supabase.from("supplements").select("id", { count: "exact", head: true }),
        supabase.from("meal_plans").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }),
        supabase.from("contacts").select("id", { count: "exact", head: true }).eq("is_read", false),
      ]);

      setStats({
        workouts: workouts.count || 0,
        supplements: supplements.count || 0,
        mealPlans: mealPlans.count || 0,
        blogPosts: blogPosts.count || 0,
        contacts: contacts.count || 0,
        unreadContacts: unreadContacts.count || 0,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Workouts", value: stats.workouts, icon: Dumbbell, color: "text-primary" },
    { title: "Supplements", value: stats.supplements, icon: Pill, color: "text-chart-2" },
    { title: "Meal Plans", value: stats.mealPlans, icon: Utensils, color: "text-chart-3" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-chart-4" },
    { title: "Total Contacts", value: stats.contacts, icon: MessageSquare, color: "text-chart-5" },
    { title: "Unread Messages", value: stats.unreadContacts, icon: Users, color: "text-destructive" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to the FitFuel admin dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {isLoading ? "..." : stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use the sidebar to navigate to different sections and manage your content.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
