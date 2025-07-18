import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { createProject, updateProject } from "@/features/project/projectThunk";

type Props = {
  Trigger: React.ReactNode;
  Purpose: "Create" | "Update";
};

const ProjectModal = ({ Trigger, Purpose }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, selectedProject } = useAppSelector(
    (state) => state.projects
  );
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    if (Purpose === "Update" && selectedProject) {
      setForm({
        name: selectedProject.name || "",
        description: selectedProject.description || "",
      });
    }
  }, [Purpose, selectedProject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || loading) return;
    if (Purpose === "Update" && selectedProject?._id) {
      await dispatch(
        updateProject({ projectId: selectedProject._id, ...form })
      );
    } else {
      await dispatch(createProject(form));
    }
    setForm({ name: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-8">
          <h2 className="text-lg font-semibold">
            {Purpose === "Update" ? "Update Project" : "Create New Project"}
          </h2>
          <div>
            <Label className="mb-1.5" htmlFor="name">
              Project Name
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Project Name"
            />
          </div>

          <div>
            <Label className="mb-1.5" htmlFor="description">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder="Brief about the project..."
            />
          </div>

          <Button disabled={loading} onClick={handleSubmit} className="w-full">
            {loading
              ? Purpose === "Update"
                ? "Updating..."
                : "Creating..."
              : Purpose === "Update"
              ? "Update Project"
              : "Create Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
