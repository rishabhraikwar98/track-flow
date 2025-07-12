import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

const HeroSection = () => {
  return (
    <section className="px-6 py-20 sm:py-32 text-center max-w-4xl mx-auto">
      {/* Gradient Headline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Supercharge Your Team’s Productivity with TrackFlow
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
        A fast, intuitive, and collaborative issue tracker built for developers who want clarity, speed, and full control. No bloat. Just flow.
      </p>

      {/* CTA Buttons */}
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <NavLink to="/register">
          <Button size="lg" className="text-md">
            Get Started
          </Button>
        </NavLink>
        <NavLink to="/login">
          <Button variant="outline" size="lg" className="text-md">
            Login
          </Button>
        </NavLink>
      </div>

      {/* Optional: Caption */}
      <p className="mt-4 text-xs text-muted-foreground">
        No credit card required · Get started in less than 1 minute
      </p>
    </section>
  );
};

export default HeroSection;
