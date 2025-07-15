import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/hooks/useRedux";
import { logoutUser } from "@/features/auth/authSlice";

type User = {
  name: string;
  avatarUrl?: string;
};

type NavbarProps = {
  loggedIn?: boolean;
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
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/invites")}
                >
                  Invites
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
