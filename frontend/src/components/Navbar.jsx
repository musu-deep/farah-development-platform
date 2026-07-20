import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpLeft, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const links = [
  ["الخدمات", "#services"],
  ["منهجيتنا", "#approach"],
  ["أعمالنا", "#work"],
  ["عن فرح", "#about"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash) => {
    setOpen(false);
    if (location.pathname !== "/") navigate(`/${hash}`);
    else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${scrolled ? "px-3 pt-3" : "px-0 pt-0"}`}>
      <nav className={`mx-auto flex max-w-[1460px] items-center justify-between px-5 py-4 transition-[background-color,border-color,backdrop-filter,border-radius] duration-300 lg:px-8 ${scrolled ? "rounded-2xl border border-white/10 bg-ink/80 text-white backdrop-blur-xl" : "border-b border-white/10 bg-transparent text-white"}`}>
        <Link to="/" data-testid="nav-logo"><Logo dark /></Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map(([label, hash]) => <button key={hash} onClick={() => go(hash)} className="text-sm text-white/65 transition-colors hover:text-white" data-testid={`nav-${hash.slice(1)}`}>{label}</button>)}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link to={user.role === "admin" ? "/admin" : "/dashboard"} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/85 transition-colors hover:bg-white/10" data-testid="nav-dashboard"><LayoutDashboard size={16} /> لوحة التحكم</Link>
          ) : (
            <Link to="/auth" className="text-sm text-white/70 transition-colors hover:text-white" data-testid="nav-login">تسجيل الدخول</Link>
          )}
          <button onClick={() => go("#contact")} className="group inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#7c3aed]" data-testid="nav-consultation">اطلب استشارة <ArrowUpLeft size={16} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></button>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" onClick={() => setOpen(!open)} aria-label="القائمة" data-testid="mobile-menu-toggle">{open ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-3 mt-2 rounded-2xl border border-white/10 bg-ink/95 p-6 text-white backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-4">
              {links.map(([label, hash]) => <button key={hash} onClick={() => go(hash)} className="border-b border-white/10 pb-3 text-start text-white/75">{label}</button>)}
              <Link to={user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/auth"} onClick={() => setOpen(false)} className="rounded-full bg-violet px-5 py-3 text-center font-bold">{user ? "لوحة التحكم" : "تسجيل الدخول"}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
