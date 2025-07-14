import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/hooks/useRedux";
import { logoutUser } from "@/features/auth/authSlice";
import InviteListModal from "@/components/InviteListModal";
import { Bell } from "lucide-react"; // You can replace with any icon

type User = {
  name: string;
  avatarUrl?: string;
};

type NavbarProps = {
  loggedIn: boolean;
  user?: User;
};

const Navbar = ({ loggedIn, user }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-primary">
          Track<span className="text-muted-foreground">Flow</span>
        </NavLink>

        {!loggedIn ? (
          <div className="flex items-center gap-4">
            <NavLink to="/login">
              <Button variant="ghost">Login</Button>
            </NavLink>
            <NavLink to="/register">
              <Button>Register</Button>
            </NavLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Invites Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogTitle>Project Invites </DialogTitle>
                <InviteListModal/>
              </DialogContent>
            </Dialog>

            {/* Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name ? user.name[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="end">
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/my-tasks")}
                >
                  My Tasks
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
