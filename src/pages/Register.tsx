import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router";
import { useAppDispatch } from "@/hooks/useRedux";
import { currentUser } from "../features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { register } from "@/features/auth/authService";
import useAuth from "@/hooks/useAuth";

const Register = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await register(formData);
      if (res.status == 201) {
        await dispatch(currentUser());
        navigate("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  if (user && !authLoading) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-lg text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-500 text-center -mt-2">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 my-3">
            <Button disabled={loading} type="submit" className="w-full">
              {loading ? "Registering..." : "Register"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary underline hover:text-primary/80"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Register;
