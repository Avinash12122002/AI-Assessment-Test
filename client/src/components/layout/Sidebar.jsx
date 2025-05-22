import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  FileEdit,
  MonitorPlay,
  BarChart3,
  UserCheck,
  Clock,
  History,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar({ userRole, className }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const hrMenuItems = [
    {
      name: "Dashboard",
      path: "/hr/dashboard",
      icon: Home,
    },
    {
      name: "Create Test",
      path: "/hr/create-test",
      icon: FileEdit,
    },
    {
      name: "Monitor Tests",
      path: "/hr/monitor-tests",
      icon: MonitorPlay,
    },
    {
      name: "Reports",
      path: "/hr/reports",
      icon: BarChart3,
    },
  ];

  const candidateMenuItems = [
    {
      name: "Dashboard",
      path: "/candidate/dashboard",
      icon: Home,
    },
    {
      name: "Start Test",
      path: "/candidate/start-test",
      icon: Clock,
    },
    {
      name: "Previous Results",
      path: "/candidate/results",
      icon: History,
    },
  ];

  const menuItems = userRole === "hr" ? hrMenuItems : candidateMenuItems;

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 bottom-0 z-20 hidden w-64 border-r bg-white lg:block",
        className
      )}
    >
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <UserCheck className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium">
            {userRole === "hr" ? "HR Dashboard" : "Candidate Portal"}
          </span>
        </div>
        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                isActive(item.path)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              <ChevronRight className="ml-auto h-4 w-4" />
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
