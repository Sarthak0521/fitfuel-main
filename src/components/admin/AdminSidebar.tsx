import { Link, useLocation } from "react-router-dom";
import {
  Dumbbell,
  Pill,
  Utensils,
  FileText,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Workouts", path: "/admin/workouts", icon: Dumbbell },
  { name: "Supplements", path: "/admin/supplements", icon: Pill },
  { name: "Meal Plans", path: "/admin/meal-plans", icon: Utensils },
  { name: "Blog Posts", path: "/admin/blog", icon: FileText },
  { name: "Contacts", path: "/admin/contacts", icon: MessageSquare },
];

export function AdminSidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Site</span>
        </Link>
        <h1 className="mt-4 text-xl font-bold text-foreground">
          Admin <span className="text-primary">Dashboard</span>
        </h1>
        {user && (
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
