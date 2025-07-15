import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  fetchProjectById,
  updateProject,
  deleteProject,
} from "@/features/project/projectSlice";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Bug, User, LogOut, MailPlus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import CreateOrUpdateProjectModal from "@/components/CreateOrUpdateProjectModal";

const Project = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [inviteEmail, setInviteEmail] = useState("");
  const { selectedProject, loading, error } = useAppSelector(
    (state) => state.projects
  );
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
    }
  }, [dispatch, projectId]);

  const isCreator = currentUser?._id === selectedProject?.createdBy?._id;

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirm && projectId) {
      // await dispatch(deleteProject(projectId));
      navigate("/dashboard");
    }
  };

  const handleLeave = async () => {
    // const confirm = window.confirm("Are you sure you want to leave this project?");
    // if (confirm && projectId) {
    //   await dispatch(leaveProject(projectId));
    //   navigate('/dashboard');
    // }
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    // await dispatch(inviteMember({ projectId, email: inviteEmail }));
    setInviteEmail("");
  };

  if (loading || !selectedProject) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-gray-500 text-lg">Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {selectedProject.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Created by:{" "}
            <span className="font-medium text-gray-700">
              {selectedProject.createdBy?.name}
            </span>{" "}
            ({selectedProject.createdBy?.email})
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isCreator && (
            <>
              <CreateOrUpdateProjectModal
                purpose="Update"
                trigger={
                  <Button
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>
                }
              />

              <Button
                variant="destructive"
                className="flex items-center gap-1"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </>
          )}
          <Button
            className="flex items-center gap-1"
            onClick={() => navigate(`/dashboard/${projectId}/issues`)}
          >
            <Bug className="w-4 h-4" />
            View Issues
          </Button>
          {!isCreator && (
            <Button
              variant="secondary"
              className="flex items-center gap-1"
              onClick={handleLeave}
            >
              <LogOut className="w-4 h-4" />
              Leave Project
            </Button>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-700">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {selectedProject.description || "No description provided."}
        </p>
      </div>
      {/* Invite Member */}
      {isCreator && (
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="email"
            placeholder="Enter email to invite"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleInvite} className="flex items-center gap-1">
            <MailPlus className="w-4 h-4" />
            Invite
          </Button>
        </div>
      )}

      {/* Members */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Team Members</h2>
        {selectedProject.members?.length === 0 ? (
          <p className="text-gray-500">No members found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedProject.members.map((member) => {
              const tags: string[] = [];
              if (member._id === selectedProject.createdBy?._id)
                tags.push("Creator");
              if (member._id === currentUser?._id) tags.push("You");

              return (
                <li
                  key={member._id}
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div className="bg-blue-100 p-2 rounded-full mt-1">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                    {tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Project;
