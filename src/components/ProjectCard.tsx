import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, Users, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import useAuth from "@/hooks/useAuth";

type Member = {
  _id: string;
  name: string;
  email: string;
};

type Project = {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  createdBy: Member;
  members: Array<Member>;
};

const ProjectCard = ({ project }: { project: Project }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <Card className="hover:shadow-xl shadow-md transition-shadow duration-300 p-4 flex flex-col justify-between h-full border border-muted">
      <CardHeader className="p-0 mb-2">
        <CardTitle className="text-lg">{project.name}</CardTitle>
        <div className="flex items-center gap-2 mt-1 text-muted-foreground text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex-1 flex flex-col justify-between mt-3">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
          {project.description || "No description provided."}
        </p>

        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>
              Created by:{" "}
              {project.createdBy._id === user?._id
                ? "You"
                : project.createdBy.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{project.members.length} {project.members.length>1?"Members":"Member"}</span>
          </div>
        </div>

        <div className="mt-4 self-end">
          <Button
            size="sm"
            variant="outline"
            className="text-sm px-3 py-1 h-8"
            onClick={() => navigate(`/dashboard/${project._id}`)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
