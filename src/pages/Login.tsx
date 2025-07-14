import { useState } from "react";
import { useAppDispatch } from "@/hooks/useRedux";
import { currentUser } from "@/features/auth/authSlice";
import { useNavigate, NavLink, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "@/features/auth/authService";
import useAuth from "@/hooks/useAuth";
const Login = () => {
  const { user, loading: authLoading } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | any>();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await login(formData);
      if (res.status === 200) {
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
          <CardTitle className="text-2xl text-center">
            Login to TrackFlow
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Don’t have an account?{" "}
              <NavLink
                to="/register"
                className="text-primary underline hover:text-primary/80"
              >
                Register
              </NavLink>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default Login;
