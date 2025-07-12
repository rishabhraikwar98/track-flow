import Features from "@/components/homepage/Features";
import Feedbacks from "@/components/homepage/Feedback";
import Footer from "@/components/homepage/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import Logos from "@/components/homepage/Logos";
import Navbar from "@/components/homepage/Navbar";
import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router";


const Marketing = () => {
  const { user, loading } = useAuth();
  if (user && !loading) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <>
    <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />
        <Features />
        <Feedbacks />
        <Logos />
      </main>
      <Footer/>
    </>
  );
};

export default Marketing;
