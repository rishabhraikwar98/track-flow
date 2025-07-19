import IssueCard from "@/components/IssueCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  fetchIssueById,
  fetchIssuesByProject,
} from "@/features/isssue/issueThunk";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import IssueModal from "@/components/IssueModal";
const Issues = () => {
  const { projectId } = useParams();
  const { selectedProject } = useAppSelector((state) => state.projects);
  const { issues, loading } = useAppSelector((state) => state.issues);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (projectId) {
      dispatch(fetchIssuesByProject(projectId));
    }
  }, [dispatch, projectId]);

  const handleCreate = () => {
    setMode("create");
    setOpen(true);
  };
  const handleEdit = (isssueId: string) => {
    setMode("edit");
    setOpen(true);
    dispatch(fetchIssueById(isssueId));
  };

  return (
    <div className="space-y-6">
      <IssueModal open={open} mode={mode} onClose={() => setOpen(false)} />
      <div className="flex justify-center">
        <NavLink to={`/dashboard/${selectedProject?._id}`}>
          <Button className="text-3xl cursor-pointer" variant={"link"}>
            {selectedProject?.name}
          </Button>
        </NavLink>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Issues</h1>
        <Button onClick={handleCreate} variant="default">
          + New Issue
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!issues && loading ? (
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
        ) : issues && issues.length > 0 ? (
          issues.map((issue,i) => (
            <div key={i} onClick={() => handleEdit(issue._id)}>
              <IssueCard issue={issue}/>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full text-center">
            No issues found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Issues;
