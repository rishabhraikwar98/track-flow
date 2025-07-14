import type React from "react";
import Navbar from "./homepage/Navbar";
import useAuth from "@/hooks/useAuth";
interface MyComponentProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<MyComponentProps> = ({ children }) => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar loggedIn={!!user} user={user || undefined} />
      {/* Main content */}
      <main className="flex-1 px-4 py-6 md:px-8">{children}</main>
    </div>
  );
};

export default AppLayout;
