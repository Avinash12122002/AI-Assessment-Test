import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Download, Eye, Search } from "lucide-react";

// Mock data for candidate performance
const mockCandidateData = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    score: 82,
    timeTaken: 25,
    submittedAt: "2025-04-14T15:30:00",
    status: "passed",
  },
  {
    id: "2",
    name: "Sam Williams",
    email: "sam.williams@example.com",
    score: 65,
    timeTaken: 28,
    submittedAt: "2025-04-14T14:20:00",
    status: "failed",
  },
  {
    id: "3",
    name: "Jamie Smith",
    email: "jamie.smith@example.com",
    score: 92,
    timeTaken: 22,
    submittedAt: "2025-04-14T16:45:00",
    status: "passed",
  },
  {
    id: "4",
    name: "Taylor Brown",
    email: "taylor.brown@example.com",
    score: 78,
    timeTaken: 27,
    submittedAt: "2025-04-14T12:15:00",
    status: "passed",
  },
  {
    id: "5",
    name: "Morgan Davis",
    email: "morgan.davis@example.com",
    score: 45,
    timeTaken: 30,
    submittedAt: "2025-04-14T13:50:00",
    status: "failed",
  },
  {
    id: "6",
    name: "Jordan Miller",
    email: "jordan.miller@example.com",
    score: 88,
    timeTaken: 24,
    submittedAt: "2025-04-14T11:10:00",
    status: "passed",
  },
  {
    id: "7",
    name: "Casey Wilson",
    email: "casey.wilson@example.com",
    score: 59,
    timeTaken: 29,
    submittedAt: "2025-04-14T10:30:00",
    status: "failed",
  },
];

export function CandidatePerformanceTable({ testId }) {
  const [candidates] = useState(mockCandidateData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Candidate
                  {sortField === "name" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("score")}
              >
                <div className="flex items-center gap-1">
                  Score
                  {sortField === "score" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("timeTaken")}
              >
                <div className="flex items-center gap-1">
                  Time Taken
                  {sortField === "timeTaken" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("submittedAt")}
              >
                <div className="flex items-center gap-1">
                  Submitted
                  {sortField === "submittedAt" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.length > 0 ? (
              sortedCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div className="font-medium">{candidate.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {candidate.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{candidate.score}%</span>
                  </TableCell>
                  <TableCell>{candidate.timeTaken} mins</TableCell>
                  <TableCell>{formatDate(candidate.submittedAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        candidate.status === "passed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {candidate.status === "passed" ? "Passed" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No candidates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
