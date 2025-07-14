import AppLayout from "@/components/AppLayout";
import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { user } = useAuth();
  return user !== null ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectRoute;
