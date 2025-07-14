import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchInvites,
  acceptInvite,
  ignoreInvite,
} from "@/features/invite/inviteSlice";
import { useEffect } from "react";

const InviteListModal = () => {
  const dispatch = useAppDispatch();
  const { invites } = useAppSelector((state) => state.invites);

  useEffect(() => {
    dispatch(fetchInvites());
  }, []);

  const handleAccept = async (inviteId: string) => {
    acceptInvite(inviteId);
  };

  const handleIgnore = async (inviteId: string) => {
    ignoreInvite(inviteId);
  };

  if (!invites || invites.length === 0)
    return <p className="text-sm text-muted-foreground">No pending invites.</p>;

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto">
      {invites.map((invite) => (
        <div
          key={invite._id}
          className="border rounded-md p-4 flex flex-col gap-2"
        >
          <div className="text-base font-medium">
            {invite.projectId?.name || "Untitled"}
          </div>
          <p className="text-sm text-muted-foreground">
            Invited by: {invite.projectId?.createdBy?.name || "Someone"}
          </p>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              variant="default"
              onClick={() => handleAccept(invite._id)}
            >
              Accept
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleIgnore(invite._id)}
            >
              Ignore
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InviteListModal;
