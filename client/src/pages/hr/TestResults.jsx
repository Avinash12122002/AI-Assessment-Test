import { useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TestAnalytics } from "@/components/reports/TestAnalytics";
import { CandidatePerformanceTable } from "@/components/reports/CandidatePerformanceTable";
import { ArrowLeft, Download, Mail, Share } from "lucide-react";
import { Link } from "react-router-dom";

const TestResults = () => {
  const { testId } = useParams();
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <DashboardLayout allowedRole="hr">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/hr/reports">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Test Results</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Email Results
            </Button>
            <Button variant="outline" size="sm">
              <Share className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="analytics"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="analytics">Analytics Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidate Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <TestAnalytics testId={testId || ""} />
          </TabsContent>

          <TabsContent value="candidates" className="mt-6">
            <CandidatePerformanceTable testId={testId || ""} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TestResults;
