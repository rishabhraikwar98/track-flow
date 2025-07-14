// components/CreateProjectModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch ,useAppSelector} from "@/hooks/useRedux";
import { createProject } from "@/features/project/projectSlice";
const CreateProjectModal = () => {
  const {loading} = useAppSelector(state=>state.projects)
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!form.name) return;
    dispatch(createProject(form));
    setForm({ name: "", description: "" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">+ New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-5">
          <div>
            <Label className="mb-2" htmlFor="name">
              Project Name
            </Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              minLength={3}
              placeholder="e.g. Bug Tracker"
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="description">
              Description
            </Label>
            <Textarea
              required
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              minLength={10}
              placeholder="Brief about the project..."
            />
          </div>
          <Button disabled={loading} onClick={handleCreate} className="w-full">
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;
