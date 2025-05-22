import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download, Eye, FileBarChart2 } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock data for previous tests
const completedTests = [
  {
    id: "1",
    title: "Product Knowledge Test for Sales",
    category: "Sales",
    dateTaken: "2025-03-15",
    score: 82,
    percentile: 76,
    questions: 20,
    correct: 16,
    incorrect: 3,
    skipped: 1,
    breakdown: [
      { category: "Product Features", score: 90 },
      { category: "Pricing", score: 70 },
      { category: "Competition", score: 85 },
      { category: "Sales Techniques", score: 60 },
    ],
    detailedFeedback:
      "Strong understanding of product features. Could improve on sales techniques and pricing knowledge.",
  },
  {
    id: "2",
    title: "Example Reasoning Test",
    category: "Cognitive",
    dateTaken: "2025-03-10",
    score: 50,
    percentile: 45,
    questions: 15,
    correct: 6,
    incorrect: 6,
    skipped: 3,
    breakdown: [
      { category: "Logical Reasoning", score: 40 },
      { category: "Numerical Reasoning", score: 60 },
      { category: "Verbal Reasoning", score: 65 },
      { category: "Abstract Reasoning", score: 35 },
    ],
    detailedFeedback:
      "Average performance in numerical and verbal reasoning. Consider improving logical and abstract reasoning skills.",
  },
];

const progressData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 75 },
  { month: "Apr", score: 82 },
];

const PreviousResults = () => {
  const [expandedTest, setExpandedTest] = useState(null);
  const [selectedTest, setSelectedTest] = useState(completedTests[0]);

  return (
    <DashboardLayout allowedRole="candidate">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Test Results</h1>
          <p className="text-muted-foreground">
            View and analyze your previous test results
          </p>
        </div>

        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">Results History</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="results" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-4 md:col-span-2">
                {completedTests.map((test) => (
                  <Collapsible
                    key={test.id}
                    open={expandedTest === test.id}
                    onOpenChange={() => {
                      setExpandedTest(
                        expandedTest === test.id ? null : test.id
                      );
                      setSelectedTest(test);
                    }}
                  >
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{test.title}</CardTitle>
                            <CardDescription>
                              {test.category} • Taken on {test.dateTaken}
                            </CardDescription>
                          </div>
                          <div className="flex items-center">
                            <div className="text-right mr-4">
                              <p className="text-sm font-medium">Score</p>
                              <p
                                className={`text-lg font-bold ${
                                  test.score >= 70
                                    ? "text-green-600"
                                    : test.score >= 50
                                    ? "text-amber-600"
                                    : "text-red-600"
                                }`}
                              >
                                {test.score}%
                              </p>
                            </div>
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </CollapsibleTrigger>
                          </div>
                        </div>
                      </CardHeader>
                      <CollapsibleContent>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div className="p-2 border rounded-md">
                                <p className="text-sm text-muted-foreground">
                                  Questions
                                </p>
                                <p className="font-medium">{test.questions}</p>
                              </div>
                              <div className="p-2 border rounded-md">
                                <p className="text-sm text-muted-foreground">
                                  Correct
                                </p>
                                <p className="font-medium text-green-600">
                                  {test.correct}
                                </p>
                              </div>
                              <div className="p-2 border rounded-md">
                                <p className="text-sm text-muted-foreground">
                                  Incorrect
                                </p>
                                <p className="font-medium text-red-600">
                                  {test.incorrect}
                                </p>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium mb-2">
                                Score Breakdown:
                              </p>
                              <div className="space-y-2">
                                {test.breakdown.map((item, index) => (
                                  <div key={index} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span>{item.category}</span>
                                      <span className="font-medium">
                                        {item.score}%
                                      </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                      <div
                                        className={`h-full rounded-full ${
                                          item.score >= 70
                                            ? "bg-green-500"
                                            : item.score >= 50
                                            ? "bg-amber-500"
                                            : "bg-red-500"
                                        }`}
                                        style={{ width: `${item.score}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="font-medium mb-1">Feedback:</p>
                              <p className="text-sm text-muted-foreground">
                                {test.detailedFeedback}
                              </p>
                            </div>

                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <Eye className="h-4 w-4" /> View Full Report
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <Download className="h-4 w-4" /> Download
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Average Score</span>
                        <span className="font-medium">66%</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tests Taken</span>
                        <span className="font-medium">
                          {completedTests.length}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Best Performance</span>
                        <span className="font-medium">82% (Sales)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm">Skill Gap Areas</span>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-700 border-red-200"
                        >
                          Abstract Reasoning
                        </Badge>
                      </div>

                      <div className="pt-4">
                        <p className="text-sm font-medium mb-2">
                          Recent Progress
                        </p>
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={progressData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis domain={[0, 100]} />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#3b82f6"
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>View your progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={selectedTest.breakdown}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="score" fill="#3b82f6" name="Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Skill Area</TableHead>
                        <TableHead>Proficiency</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Product Knowledge</TableCell>
                        <TableCell>90%</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Excellent
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Sales Techniques</TableCell>
                        <TableCell>60%</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-800 border-amber-200"
                          >
                            Average
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Abstract Reasoning</TableCell>
                        <TableCell>35%</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-800 border-red-200"
                          >
                            Needs Improvement
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
                    <FileBarChart2 className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Practice Abstract Reasoning
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Focus on pattern recognition and logical thinking
                        exercises.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2">
                    <FileBarChart2 className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Refine Sales Techniques
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Brush up on handling objections and closing strategies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PreviousResults;
