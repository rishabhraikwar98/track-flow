import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-primary">
          Track<span className="text-muted-foreground">Flow</span>
        </NavLink>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <NavLink to="/login">
            <Button variant="ghost">Login</Button>
          </NavLink>
          <NavLink to="/register">
            <Button>Register</Button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
