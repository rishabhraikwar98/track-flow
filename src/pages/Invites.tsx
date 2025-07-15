import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchInvites,
  acceptInvite,
  ignoreInvite,
} from "@/features/invite/inviteSlice";

import { Button } from "@/components/ui/button";
import { MailOpen, User2 } from "lucide-react";

const Invites = () => {
  const dispatch = useAppDispatch();
  const { invites, loading } = useAppSelector((state) => state.invites);

  useEffect(() => {
    dispatch(fetchInvites());
  }, [dispatch]);

  const handleAccept = (inviteId: string) => {
    dispatch(acceptInvite(inviteId));
  };

  const handleIgnore = (inviteId: string) => {
    dispatch(ignoreInvite(inviteId));
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <MailOpen className="text-primary w-6 h-6" />
          <h1 className="text-2xl font-semibold">Project Invites</h1>
        </div>

        {/* Scrollable area */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {loading ? (
            <p className="text-muted-foreground">Loading invites...</p>
          ) : invites.length === 0 ? (
            <p className="text-muted-foreground">No invites at the moment.</p>
          ) : (
            invites.map((invite) => (
              <div
                key={invite._id}
                className="border border-muted rounded-md p-4 bg-muted/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted transition"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm">
                    <span className="font-medium text-primary">
                      {invite.project.name}
                    </span>{" "}
                    has invited you to collaborate.
                  </p>
                  <div className="flex items-center text-muted-foreground text-sm gap-2">
                    <User2 className="w-4 h-4" />
                    {invite.project.createdBy.name} (
                    {invite.project.createdBy.email})
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleIgnore(invite._id)}
                  >
                    Ignore
                  </Button>
                  <Button size="sm" onClick={() => handleAccept(invite._id)}>
                    Accept
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Invites;
