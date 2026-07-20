import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ProtectedRoute from "./components/ProtectedRoute";
const Home = lazy(() => import("./pages/Home"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Admin = lazy(() => import("./pages/Admin"));
const CapacityBuilder = lazy(() => import("./pages/CapacityBuilder"));

function PublicLayout({ children }) {
  return <><Navbar />{children}<Footer /><Chatbot /></>;
}

function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) setTimeout(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }), 80);
    else window.scrollTo(0, 0);
  }, [location]);
  return null;
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame;
    const loop = (time) => { lenis.raf(time); frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return <AuthProvider><BrowserRouter><ScrollManager /><Toaster position="top-center" richColors theme="dark" /><Suspense fallback={<div className="grid min-h-screen place-items-center bg-ink text-white/50">جاري تحميل المنصة...</div>}><Routes>
    <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
    <Route path="/capacity-builder" element={<PublicLayout><CapacityBuilder /></PublicLayout>} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Suspense></BrowserRouter></AuthProvider>;
}
