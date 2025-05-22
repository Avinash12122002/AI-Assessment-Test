import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, AlertCircle, UserCheck, UserX, Eye } from "lucide-react";

// Sample data for candidates
const candidates = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    testName: "Programming Skills Assessment",
    status: "in-progress",
    progress: 45,
    violations: 0,
    timeRemaining: "16:22",
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    testName: "Programming Skills Assessment",
    status: "in-progress",
    progress: 75,
    violations: 2,
    timeRemaining: "08:43",
  },
  {
    id: "3",
    name: "Michael Chang",
    email: "m.chang@example.com",
    testName: "Customer Care Periodic Test",
    status: "not-started",
    progress: 0,
    violations: 0,
  },
  {
    id: "4",
    name: "Lisa Rodriguez",
    email: "lisa.r@example.com",
    testName: "Product Knowledge Test for Sales",
    status: "completed",
    progress: 100,
    violations: 1,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "d.wilson@example.com",
    testName: "Programming Skills Assessment",
    status: "in-progress",
    progress: 30,
    violations: 3,
    timeRemaining: "21:15",
  },
];

const MonitorTests = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter((candidate) => {
    const searchLower = search.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.email.toLowerCase().includes(searchLower) ||
      candidate.testName.toLowerCase().includes(searchLower)
    );
  });

  const activeCandidates = filteredCandidates.filter(
    (c) => c.status === "in-progress"
  );
  const pendingCandidates = filteredCandidates.filter(
    (c) => c.status === "not-started"
  );
  const completedCandidates = filteredCandidates.filter(
    (c) => c.status === "completed"
  );

  const handleViewSession = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleFlagViolation = (candidateId) => {
    toast({
      title: "Violation flagged",
      description:
        "The candidate has been notified about the suspicious behavior.",
    });
  };

  const handleInterveneToChatWithCandidate = (candidateId) => {
    toast({
      title: "Chat initiated",
      description: "Opening chat with the candidate...",
    });
  };

  return (
    <DashboardLayout allowedRole="hr">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">
              Monitor Live Tests
            </h1>
            <p className="text-muted-foreground">
              Track progress and monitor candidate behavior during assessments
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates or tests..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              All Tests
            </Badge>
            <Badge variant="outline" className="hover:bg-muted/50">
              Programming
            </Badge>
            <Badge variant="outline" className="hover:bg-muted/50">
              Sales
            </Badge>
            <Badge variant="outline" className="hover:bg-muted/50">
              Customer Service
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Candidates list */}
          <div className="md:col-span-1 space-y-4">
            <Tabs defaultValue="active">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="active">
                  Active ({activeCandidates.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingCandidates.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedCandidates.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4 mt-4">
                {activeCandidates.length === 0 ? (
                  <div className="text-center p-4 border rounded-md">
                    <p className="text-muted-foreground">
                      No active candidates
                    </p>
                  </div>
                ) : (
                  activeCandidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className={`cursor-pointer hover:bg-muted/50 ${
                        selectedCandidate?.id === candidate.id
                          ? "border-primary"
                          : ""
                      }`}
                      onClick={() => handleViewSession(candidate)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.testName}
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary"
                                style={{ width: `${candidate.progress}%` }}
                              />
                            </div>
                            <span className="text-xs ml-2">
                              {candidate.progress}%
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-medium">
                            {candidate.timeRemaining}
                          </div>
                          {candidate.violations > 0 && (
                            <Badge variant="destructive" className="mt-1">
                              {candidate.violations} alert
                              {candidate.violations > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-4">
                {pendingCandidates.length === 0 ? (
                  <div className="text-center p-4 border rounded-md">
                    <p className="text-muted-foreground">
                      No pending candidates
                    </p>
                  </div>
                ) : (
                  pendingCandidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="p-4">
                        <div className="space-y-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.email}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.testName}
                          </div>
                          <Badge variant="outline" className="mt-1">
                            Not started
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-4">
                {completedCandidates.length === 0 ? (
                  <div className="text-center p-4 border rounded-md">
                    <p className="text-muted-foreground">No completed tests</p>
                  </div>
                ) : (
                  completedCandidates.map((candidate) => (
                    <Card key={candidate.id}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div className="space-y-1">
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.testName}
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-success/10 text-success mt-1"
                          >
                            Completed
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          View Results
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Monitoring view */}
          <div className="md:col-span-2">
            {selectedCandidate ? (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{selectedCandidate.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedCandidate.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          selectedCandidate.violations > 0
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {selectedCandidate.violations} Alert
                        {selectedCandidate.violations !== 1 ? "s" : ""}
                      </Badge>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Full Screen</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Live monitoring preview */}
                  <div className="relative rounded-lg bg-black aspect-video overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-lg">
                        Live monitoring feed would be displayed here
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded">
                      {selectedCandidate.timeRemaining} remaining
                    </div>
                  </div>

                  {/* Monitoring controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleFlagViolation(selectedCandidate.id)}
                    >
                      Flag Violation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleInterveneToChatWithCandidate(selectedCandidate.id)
                      }
                    >
                      Chat with Candidate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">
                  Select a candidate to start monitoring
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MonitorTests;
