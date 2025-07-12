import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { user } = useAuth();
  return user !== null ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectRoute;
