import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Clock, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock test data
const availableTests = [
  {
    id: "1",
    title: "Programming Skills Assessment",
    category: "Programming",
    duration: 30,
    questions: 15,
    deadline: "2025-05-15",
    status: "available",
  },
  {
    id: "2",
    title: "Customer Care Periodic Test",
    category: "Customer Service",
    duration: 20,
    questions: 10,
    deadline: "2025-04-30",
    status: "available",
  },
  {
    id: "3",
    title: "Sales Techniques Evaluation",
    category: "Sales",
    duration: 25,
    questions: 12,
    deadline: "2025-05-10",
    status: "available",
  },
  {
    id: "4",
    title: "Leadership Assessment",
    category: "Management",
    duration: 40,
    questions: 20,
    deadline: "2025-05-20",
    status: "available",
  },
];

const StartTest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const filteredTests = availableTests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartTest = () => {
    if (!selectedTest) {
      toast({
        title: "No test selected",
        description: "Please select a test before proceeding.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Test selected",
      description: "Preparing your test environment...",
    });

    // Navigate to the test taking page
    navigate("/candidate/take-test");
  };

  return (
    <DashboardLayout allowedRole="candidate">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Available Tests</h1>
          <p className="text-muted-foreground">
            Start a new assessment or view upcoming tests
          </p>
        </div>

        {selectedTest ? (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {availableTests.find((t) => t.id === selectedTest)?.title}
                  </CardTitle>
                  <CardDescription>
                    Category:{" "}
                    {
                      availableTests.find((t) => t.id === selectedTest)
                        ?.category
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Duration:{" "}
                        {
                          availableTests.find((t) => t.id === selectedTest)
                            ?.duration
                        }{" "}
                        minutes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Questions:{" "}
                        {
                          availableTests.find((t) => t.id === selectedTest)
                            ?.questions
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>
                        Deadline:{" "}
                        {
                          availableTests.find((t) => t.id === selectedTest)
                            ?.deadline
                        }
                      </span>
                    </div>

                    <div className="pt-4 space-y-2">
                      <h3 className="font-medium">Instructions:</h3>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Ensure you have a stable internet connection</li>
                        <li>
                          You will need to enable your camera for proctoring
                        </li>
                        <li>Once started, the test cannot be paused</li>
                        <li>
                          Answer all questions to the best of your ability
                        </li>
                        <li>
                          You can review your answers before final submission
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTest(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleStartTest}>Start Test</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Before You Begin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <p>
                        Once you start the test, you cannot pause it. Make sure
                        you have sufficient time to complete it.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium mb-2">System Requirements:</p>
                      <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Modern web browser (Chrome recommended)</li>
                        <li>Webcam and microphone access</li>
                        <li>Stable internet connection</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-medium mb-2">What to Expect:</p>
                      <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Mix of multiple choice questions</li>
                        <li>Some questions may have time limits</li>
                        <li>Environment and face scanning before start</li>
                        <li>Results will be available after review</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tests by name or category..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">
                            {test.title}
                          </TableCell>
                          <TableCell>{test.category}</TableCell>
                          <TableCell>{test.duration} mins</TableCell>
                          <TableCell>{test.questions}</TableCell>
                          <TableCell>{test.deadline}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              Available
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedTest(test.id)}
                            >
                              Select
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-4 text-muted-foreground"
                        >
                          No tests found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StartTest;
