import { BrowserRouter as Router, Route, Routes } from "react-router";
import Marketing from "./pages/Marketing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import MyTasks from "./pages/MyTasks";
import ProtectRoute from "./routes/ProtectRoute";
import { useEffect } from "react";
import { currentUser } from "./features/auth/authSlice";
import { useAppDispatch } from "./hooks/useRedux";
import { Toaster } from "react-hot-toast";
import Invites from "./pages/Invites";
const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(currentUser());
  }, [currentUser]);
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Marketing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/invites" element={<Invites/>} />
            <Route path="/dashboard/:projectId" element={<ProjectDetail/>} />
            <Route path="/dashboard/my-tasks" element={<MyTasks />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center"/>
    </>
  );
};

export default App;
