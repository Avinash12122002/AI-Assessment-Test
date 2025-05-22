import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TestCard } from "@/components/tests/TestCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  Plus,
} from "lucide-react";
import { UserSettings } from "@/components/user/UserSettings";

const mockTests = [
  {
    id: "1",
    title: "Programming Skills Assessment",
    description: "Evaluate coding skills and problem-solving abilities",
    category: "Programming",
    status: "active",
    createdDate: "2025-03-21",
    respondents: 24,
    avgScore: 76,
  },
  {
    id: "2",
    title: "Customer Care Periodic Test",
    description: "Regular assessment for customer service skills",
    category: "Customer Service",
    status: "setup",
    createdDate: "2025-03-21",
    respondents: 0,
  },
  {
    id: "3",
    title: "Product Knowledge Test for Sales",
    description: "Test on product features and sales techniques",
    category: "Sales",
    status: "setup",
    createdDate: "2025-03-21",
    respondents: 0,
  },
  {
    id: "4",
    title: "Data Analysis Proficiency",
    description: "Assessment for data analysis and visualization skills",
    category: "Data Science",
    status: "completed",
    createdDate: "2025-03-10",
    respondents: 15,
    avgScore: 68,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleTestAction = (action, id) => {
    if (action === "view-results") {
      navigate("/hr/reports");
    } else if (action === "edit") {
      navigate("/hr/create-test");
    } else {
      toast({
        title: "Action triggered",
        description: `${action} action for test ID: ${id}`,
      });
    }
  };

  return (
    <DashboardLayout allowedRole="hr">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">HR Dashboard</h1>
          <div className="flex items-center gap-2">
            <UserSettings />
            <Button
              onClick={() => navigate("/hr/create-test")}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create new test
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">My Tests</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="dashboard-card flex items-center space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Tests
                  </p>
                  <h3 className="text-2xl font-bold">4</h3>
                </div>
              </div>

              <div className="dashboard-card flex items-center space-x-4">
                <div className="bg-success/10 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Completed
                  </p>
                  <h3 className="text-2xl font-bold">39</h3>
                </div>
              </div>

              <div className="dashboard-card flex items-center space-x-4">
                <div className="bg-warning/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
              </div>

              <div className="dashboard-card flex items-center space-x-4">
                <div className="bg-destructive/10 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Violations
                  </p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
              </div>
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Recent Test Results</h3>
                  <Button variant="ghost" size="sm">
                    View all
                  </Button>
                </div>
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Chart visualization showing recent test scores
                    </p>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Active Candidates</h3>
                  <Button variant="ghost" size="sm">
                    View all
                  </Button>
                </div>
                <div className="flex items-center justify-center h-64">
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <Users className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      Visualization showing candidate activity and status
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Recent Tests</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("tests")}
                >
                  View all tests
                </Button>
              </div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {mockTests.slice(0, 2).map((test) => (
                  <TestCard
                    key={test.id}
                    {...test}
                    onAction={handleTestAction}
                    viewType="hr"
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tests">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {mockTests.map((test) => (
                <TestCard
                  key={test.id}
                  {...test}
                  onAction={handleTestAction}
                  viewType="hr"
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="candidates">
            <div className="flex items-center justify-center h-48 border rounded-md bg-white">
              <div className="flex flex-col items-center justify-center text-center p-6">
                <Users className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">
                  Candidate management functionality coming soon
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
