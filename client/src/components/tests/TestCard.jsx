import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Users,
  BarChart3,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function TestCard({
  id,
  title,
  description,
  category = "Uncategorized",
  status,
  createdDate,
  respondents = 0,
  avgScore,
  onAction,
  viewType = "hr",
}) {
  const statusColors = {
    setup: "bg-orange-100 text-orange-800",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    archived: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    setup: "SETUP IN PROGRESS",
    active: "ACTIVE",
    completed: "COMPLETED",
    archived: "ARCHIVED",
  };

  const handleAction = (action) => {
    if (onAction) {
      onAction(action, id);
    }
  };

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-4 pb-0 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium rounded-md",
              statusColors[status]
            )}
          >
            {statusLabels[status]}
          </Badge>
          <p className="text-xs text-muted-foreground">
            CREATED: {createdDate}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="-mr-2">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {viewType === "hr" ? (
              <>
                <DropdownMenuItem onClick={() => handleAction("edit")}>
                  Edit test
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("duplicate")}>
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAction("archive")}>
                  Archive
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => handleAction("view-details")}>
                View details
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description || "(no description)"}
        </p>
        <Badge variant="secondary" className="text-xs rounded-md">
          {category}
        </Badge>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-4 text-xs">
        {viewType === "hr" && (
          <>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>
                {respondents} {respondents === 1 ? "response" : "responses"}
              </span>
            </div>

            {avgScore !== undefined && (
              <div className="flex items-center gap-1">
                <BarChart3 className="h-3 w-3" />
                <span>{avgScore}% avg. score</span>
              </div>
            )}
          </>
        )}

        {viewType === "candidate" && (
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>30 minutes</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          <FileText className="h-3 w-3" />
          <span>20 questions</span>
        </div>

        <div className="ml-auto">
          {viewType === "hr" ? (
            <Button size="sm" onClick={() => handleAction("view-results")}>
              View results
            </Button>
          ) : (
            <Button size="sm" onClick={() => handleAction("start-test")}>
              Start test
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
