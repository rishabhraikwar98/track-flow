import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="border-t bg-background py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        {/* Left - Logo */}
        <NavLink to="/" className="font-semibold text-primary mb-4 md:mb-0">
          Track<span className="text-muted-foreground">Flow</span>
        </NavLink>

        {/* Center - Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <NavLink to="/privacy" className="hover:underline">
            Privacy
          </NavLink>
          <NavLink to="/terms" className="hover:underline">
            Terms
          </NavLink>
          <a
            href="https://github.com/rishabhraikwar98"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
        </div>

        {/* Right - Copyright */}
        <p className="text-xs text-center md:text-right">
          © {new Date().getFullYear()} TrackFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
