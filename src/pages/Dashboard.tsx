import ProjectCard from "@/components/ProjectCard";
import CreateOrUProjectModal from "@/components/CreateOrUpdateProjectModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchProjects } from "@/features/project/projectSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Projects</h1>
        <CreateOrUProjectModal trigger={<Button variant="default">+ New Project</Button>} purpose="Create" />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-md border border-muted p-4 space-y-3 bg-muted/50"
            >
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          ))
        ) : projects && projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard project={project} key={project._id} />
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
