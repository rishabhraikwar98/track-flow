// pages/dashboard/index.tsx
import ProjectCard from "@/components/ProjectCard";
import CreateProjectModal from "@/components/CreateProjectModal";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect } from "react";
import { fetchProjects } from "@/features/project/projectSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector((state) => state.projects); 
  useEffect(()=>{
    dispatch(fetchProjects())
  },[])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">My Projects</h1>
        <CreateProjectModal />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => <ProjectCard project={project} key={project._id} />)
        ) : (
          <p className="text-muted-foreground col-span-full text-center">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
