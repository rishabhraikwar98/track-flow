import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  createIssue,
  updateIssue,
  deleteIssue,
} from "@/features/isssue/issueThunk";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import useAuth from "@/hooks/useAuth";
import { ConfirmDialog } from "./ConfirmDialog";

interface IssueModalProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
}

type FormState = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string | null;
};
const IssueModal = ({ open, onClose, mode }: IssueModalProps) => {
  const dispatch = useAppDispatch();
  const { selectedIssue } = useAppSelector((state) => state.issues);
  const { selectedProject } = useAppSelector((state) => state.projects);
  const { user } = useAuth();

  const [showAlert, setShowAlert] = useState(false);
  const isProjectCreator = selectedProject?.createdBy?._id === user?._id;
  const isIssueCreator = selectedIssue?.createdBy?._id === user?._id;
  const isCreator = isProjectCreator || isIssueCreator;
  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    status: "Open",
    priority: "Low",
    assignedTo: null,
  });

  useEffect(() => {
    if (mode === "edit" && selectedIssue) {
      setForm({
        title: selectedIssue?.title,
        description: selectedIssue?.description,
        status: selectedIssue?.status,
        priority: selectedIssue?.priority,
        assignedTo:
          typeof selectedIssue?.assignedTo === "object"
            ? selectedIssue?.assignedTo?._id ?? null
            : selectedIssue?.assignedTo ?? null,
      });
    } else {
      setForm({
        title: "",
        description: "",
        status: "Open",
        priority: "Low",
        assignedTo: null,
      });
    }
  }, [selectedIssue, mode]);

  const handleSubmit = () => {
    if (mode === "create") {
      dispatch(createIssue({ ...form, projectId: selectedProject?._id }));
    } else if (mode === "edit" && selectedIssue?._id) {
      dispatch(updateIssue({ ...form, issueId: selectedIssue?._id }));
    }
    onClose();
    setForm({
      title: "",
      description: "",
      status: "Open",
      priority: "Low",
      assignedTo: null,
    });
  };

  const handleDelete = () => {
    if (selectedIssue?._id) {
      dispatch(deleteIssue(selectedIssue._id));
      onClose();
      setShowAlert(false);
    }
  };

  const isDisabled = mode === "edit" && !isCreator;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "create" ? "Create New Issue" : "Issue Details"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div>
            <Label className="mb-1.5">Title</Label>
            <Input
              disabled={isDisabled}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <Label className="mb-1.5">Description</Label>
            <Textarea
              disabled={isDisabled}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="mb-1.5">Status</Label>
              <Select
                disabled={isDisabled}
                value={form.status}
                onValueChange={(val) => setForm({ ...form, status: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In_Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5">Priority</Label>
              <Select
                disabled={isDisabled}
                value={form.priority}
                onValueChange={(val) => setForm({ ...form, priority: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5">Assign to</Label>
              <Select
                disabled={isDisabled}
                value={form.assignedTo || "none"}
                onValueChange={(val) =>
                  setForm({ ...form, assignedTo: val === "none" ? null : val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {selectedProject?.members?.map((member) => (
                    <SelectItem key={member._id} value={member._id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {(mode === "create" || isCreator) && (
          <div className="flex justify-end gap-2 mt-4">
            {mode === "edit" && (
              <Button variant="destructive" onClick={()=> setShowAlert(true)}>
                Delete
              </Button>
            )}
            <Button onClick={handleSubmit}>
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </div>
        )}
      </DialogContent>
      <ConfirmDialog
        open={showAlert}
        onCancel={() => setShowAlert(false)}
        onConfirm={handleDelete}
        title="Delete Issue"
        description="Are you sure you want to delete this issue?"/>
    </Dialog>
  );
};

export default IssueModal;
