import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ProctoringScreen } from "@/components/proctoring/ProctoringScreen";

export function DashboardLayout({
  children,
  requireAuth = true,
  allowedRole = null,
  showSidebar = true,
  enableProctoring = false,
  testTimeMinutes = 30,
}) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldShowProctoring, setShouldShowProctoring] = useState(false);

  useEffect(() => {
    // If the user is not authenticated and authentication is required
    if (requireAuth && !isAuthenticated) {
      navigate("/login");
      return;
    }

    // If role-specific access is required and the user's role doesn't match
    if (
      requireAuth &&
      isAuthenticated &&
      allowedRole &&
      user?.role !== allowedRole
    ) {
      navigate(user?.role === "hr" ? "/hr/dashboard" : "/candidate/dashboard");
    }

    // Determine if we should show proctoring
    // Only show proctoring if explicitly enabled AND on a test-taking related page
    if (enableProctoring && isAuthenticated && user?.role === "candidate") {
      const testRelatedPages = [
        "/candidate/take-test",
        "/candidate/start-test",
      ];
      const isTestRelatedPage = testRelatedPages.some((path) =>
        location.pathname.includes(path)
      );
      setShouldShowProctoring(isTestRelatedPage);
    } else {
      setShouldShowProctoring(false);
    }
  }, [
    requireAuth,
    isAuthenticated,
    allowedRole,
    user,
    navigate,
    enableProctoring,
    location.pathname,
  ]);

  const handleProctoringViolation = (violationType) => {
    console.log(`Proctoring violation detected: ${violationType}`);
    // In a real application, you would log this violation to your backend
  };

  // Early return for immediate redirect
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex">
        {showSidebar && isAuthenticated && (
          <Sidebar userRole={user?.role || null} />
        )}
        <main
          className={cn("flex-1 p-4 md:p-6", showSidebar ? "lg:ml-64" : "")}
        >
          {children}
        </main>
      </div>
      <Footer className={cn(showSidebar ? "lg:ml-64" : "")} />

      {/* Proctoring component */}
      {shouldShowProctoring && (
        <ProctoringScreen
          onViolation={handleProctoringViolation}
          testTimeMinutes={testTimeMinutes}
        />
      )}
    </div>
  );
}
