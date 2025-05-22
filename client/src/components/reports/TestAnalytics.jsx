import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  BarChart3,
  Clock,
  FileQuestion,
  PieChart as PieChartIcon,
  Users,
} from "lucide-react";

export function TestAnalytics({ testId }) {
  // This would be fetched from an API in a real application
  const testData = {
    title: "Programming Skills Assessment",
    totalCandidates: 45,
    completedTests: 38,
    averageScore: 72.5,
    passingScore: 70,
    passRate: 68,
    averageCompletionTime: 22, // minutes
    questions: 20,
    difficulty: "Medium",
    topicBreakdown: [
      { name: "JavaScript", value: 45 },
      { name: "HTML/CSS", value: 20 },
      { name: "React", value: 25 },
      { name: "Node.js", value: 10 },
    ],
    scoreDistribution: [
      { range: "0-20%", count: 2 },
      { range: "21-40%", count: 5 },
      { range: "41-60%", count: 8 },
      { range: "61-80%", count: 18 },
      { range: "81-100%", count: 5 },
    ],
    questionDifficulty: [
      { id: 1, correct: 36, incorrect: 2 },
      { id: 2, correct: 30, incorrect: 8 },
      { id: 3, correct: 25, incorrect: 13 },
      { id: 4, correct: 32, incorrect: 6 },
      { id: 5, correct: 18, incorrect: 20 },
      { id: 6, correct: 22, incorrect: 16 },
      { id: 7, correct: 28, incorrect: 10 },
      { id: 8, correct: 33, incorrect: 5 },
      { id: 9, correct: 15, incorrect: 23 },
      { id: 10, correct: 30, incorrect: 8 },
    ],
    timePerformance: [
      { minute: 0, candidates: 0 },
      { minute: 5, candidates: 2 },
      { minute: 10, candidates: 8 },
      { minute: 15, candidates: 15 },
      { minute: 20, candidates: 25 },
      { minute: 25, candidates: 33 },
      { minute: 30, candidates: 38 },
    ],
  };

  const COLORS = [
    "#4f46e5",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">{testData.title} - Analytics</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of test performance and candidate results
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2 items-center text-center">
              <Users className="h-8 w-8 text-primary" />
              <h3 className="text-3xl font-bold">
                {testData.completedTests}/{testData.totalCandidates}
              </h3>
              <p className="text-sm text-muted-foreground">Tests Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2 items-center text-center">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h3 className="text-3xl font-bold">{testData.averageScore}%</h3>
              <p className="text-sm text-muted-foreground">Average Score</p>
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Pass: {testData.passingScore}%</span>
                  <span>Pass Rate: {testData.passRate}%</span>
                </div>
                <Progress value={testData.averageScore} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2 items-center text-center">
              <FileQuestion className="h-8 w-8 text-primary" />
              <h3 className="text-3xl font-bold">{testData.questions}</h3>
              <p className="text-sm text-muted-foreground">Questions</p>
              <Badge>{testData.difficulty} Difficulty</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col space-y-2 items-center text-center">
              <Clock className="h-8 w-8 text-primary" />
              <h3 className="text-3xl font-bold">
                {testData.averageCompletionTime} min
              </h3>
              <p className="text-sm text-muted-foreground">
                Avg. Completion Time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={testData.scoreDistribution}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Candidates" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={testData.topicBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {testData.topicBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
              {testData.topicBreakdown.map((topic, index) => (
                <div key={topic.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-xs">{topic.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Difficulty Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Question Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={testData.questionDifficulty}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="id" type="category" name="Question" />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="correct"
                  name="Correct"
                  stackId="a"
                  fill="#10b981"
                />
                <Bar
                  dataKey="incorrect"
                  name="Incorrect"
                  stackId="a"
                  fill="#ef4444"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Time Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Completion Time Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={testData.timePerformance}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minute" name="Time (minutes)" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="candidates"
                  name="Candidates Completed"
                  stroke="#4f46e5"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Individual Candidate Performance Table would go here */}
    </div>
  );
}
