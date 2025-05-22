import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TestCard } from "@/components/tests/TestCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle2, Award, CalendarDays } from "lucide-react";
import { UserSettings } from "@/components/user/UserSettings";

// Mock data for tests
const mockTests = [
  {
    id: "1",
    title: "Programming Skills Assessment",
    description: "Evaluate coding skills and problem-solving abilities",
    category: "Programming",
    status: "active",
    createdDate: "2025-03-21",
  },
  {
    id: "2",
    title: "Customer Care Periodic Test",
    description: "Regular assessment for customer service skills",
    category: "Customer Service",
    status: "active",
    createdDate: "2025-03-21",
  },
];

// Mock data for completed tests
const mockCompletedTests = [
  {
    id: "3",
    title: "Product Knowledge Test for Sales",
    description: "Test on product features and sales techniques",
    category: "Sales",
    status: "completed",
    createdDate: "2025-03-15",
    respondents: 1,
    avgScore: 82,
  },
  {
    id: "4",
    title: "Example Reasoning Test",
    description: "Logical reasoning and problem-solving assessment",
    category: "Cognitive",
    status: "completed",
    createdDate: "2025-03-10",
    respondents: 1,
    avgScore: 50,
  },
];

const CandidateDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTestAction = (action, id) => {
    if (action === "start-test") {
      navigate("/candidate/take-test");
    } else if (action === "view-details") {
      navigate("/candidate/results");
    } else {
      toast({
        title: "Action triggered",
        description: `${action} action for test ID: ${id}`,
      });
    }
  };

  return (
    <DashboardLayout allowedRole="candidate">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Candidate Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <UserSettings />
            <Button
              onClick={() => navigate("/candidate/start-test")}
              className="bg-primary hover:bg-primary/90"
            >
              Find available tests
            </Button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="dashboard-card flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Pending Tests
              </p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </div>

          <div className="dashboard-card flex items-center space-x-4">
            <div className="bg-success/10 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Completed
              </p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </div>

          <div className="dashboard-card flex items-center space-x-4">
            <div className="bg-accent p-3 rounded-full">
              <Award className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Best Score
              </p>
              <h3 className="text-2xl font-bold">82%</h3>
            </div>
          </div>

          <div className="dashboard-card flex items-center space-x-4">
            <div className="bg-secondary p-3 rounded-full">
              <CalendarDays className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Next Test
              </p>
              <h3 className="text-lg font-medium">Today</h3>
            </div>
          </div>
        </div>

        {/* Pending tests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Pending Tests</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {mockTests.map((test) => (
              <TestCard
                key={test.id}
                {...test}
                onAction={handleTestAction}
                viewType="candidate"
              />
            ))}
          </div>
        </div>

        {/* Completed tests */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Completed Tests</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {mockCompletedTests.map((test) => (
              <TestCard
                key={test.id}
                {...test}
                onAction={handleTestAction}
                viewType="candidate"
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
