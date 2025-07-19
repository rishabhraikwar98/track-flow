import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Issue } from "@/features/isssue/issueSlice";
import { format } from "date-fns";
import {
  Flag,
  Activity,
  UserCircle,
  UserRoundCheck,
  CalendarDays,
  StickyNote,
} from "lucide-react";

const statusColor: Record<string, string> = {
  Open: "bg-blue-100 text-blue-800",
  In_Progress: "bg-yellow-100 text-yellow-800",
  Closed: "bg-green-100 text-green-800",
};

const priorityColor: Record<string, string> = {
  Low: "bg-gray-100 text-gray-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800",
};

const IssueCard = ({ issue }: { issue: Issue }) => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden h-64 flex flex-col justify-between">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold truncate flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-muted-foreground" />
          {issue.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {issue.description}
        </p>
      </CardHeader>

      <CardContent className="text-sm space-y-2">
        <div className="flex flex-wrap gap-2 text-xs">
          <span
            className={`px-2 py-1 rounded flex items-center gap-1 ${statusColor[issue.status] || ""}`}
          >
            <Activity className="h-4 w-4" />
            {issue.status.split("_").join(" ")}
          </span>
          <span
            className={`px-2 py-1 rounded flex items-center gap-1 ${priorityColor[issue.priority] || ""}`}
          >
            <Flag className="h-4 w-4" />
            {issue.priority}
          </span>
        </div>

        <p className="flex items-center gap-1">
          <UserCircle className="h-4 w-4 text-muted-foreground" />
          <strong>Created by:</strong> {issue.createdBy?.name}
        </p>
        <p className="flex items-center gap-1">
          <UserRoundCheck className="h-4 w-4 text-muted-foreground" />
          <strong>Assigned to:</strong>{" "}
          {typeof issue.assignedTo === "object" && issue.assignedTo !== null
            ? issue.assignedTo.name
            : issue.assignedTo || "Unassigned"}
        </p>
        <p className="flex items-center gap-1">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <strong>Created on:</strong> {format(issue.createdAt, "Pp")}
        </p>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
