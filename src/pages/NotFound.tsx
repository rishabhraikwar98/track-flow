import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-16 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="text-destructive w-16 h-16" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">404 - Page Not Found</h1>
        <p className="text-muted-foreground text-sm">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
