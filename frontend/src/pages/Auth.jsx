import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";
import { apiError } from "../lib";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", phone: "" });
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });

  async function submit(event) {
    event.preventDefault(); setLoading(true);
    try {
      const user = mode === "login" ? await login({ email: form.email, password: form.password }) : await register(form);
      toast.success(mode === "login" ? "أهلاً بعودتك" : "تم إنشاء حسابك بنجاح");
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (error) { toast.error(apiError(error)); }
    finally { setLoading(false); }
  }

  return <main className="grain relative grid min-h-screen place-items-center overflow-hidden bg-ink px-6 py-20 text-white" data-testid="auth-page">
    <div className="absolute -start-24 top-1/4 h-80 w-80 rounded-full bg-violet/18 blur-[110px]" />
    <div className="absolute inset-0 soft-grid opacity-15" />
    <motion.section initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-panel/80 p-7 shadow-2xl backdrop-blur-xl lg:p-11">
      <Link to="/"><Logo dark /></Link>
      <div className="mt-10"><p className="text-xs font-bold tracking-[.18em] text-violet-200">بوابة فرح</p><h1 className="mt-3 font-display text-4xl font-bold">{mode === "login" ? "تسجيل الدخول" : "إنشاء حساب عميل"}</h1><p className="mt-3 leading-7 text-white/42">{mode === "login" ? "تابع طلباتك ومراحل العمل من لوحة واحدة." : "أنشئ حساباً لمتابعة طلبات الاستشارة وحالة كل طلب."}</p></div>
      <form onSubmit={submit} className="mt-8 space-y-4">
        {mode === "register" && <><input required minLength={2} value={form.name} onChange={set("name")} className="dark-input w-full" placeholder="الاسم الكامل" data-testid="auth-name" /><div className="grid gap-4 sm:grid-cols-2"><input value={form.company} onChange={set("company")} className="dark-input w-full" placeholder="الجهة" /><input value={form.phone} onChange={set("phone")} className="dark-input w-full" placeholder="رقم الجوال" /></div></>}
        <input required type="email" value={form.email} onChange={set("email")} className="dark-input w-full" placeholder="البريد الإلكتروني" data-testid="auth-email" />
        <input required minLength={8} type="password" value={form.password} onChange={set("password")} className="dark-input w-full" placeholder="كلمة المرور" data-testid="auth-password" />
        <button disabled={loading} className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 font-bold transition-colors hover:bg-[#7c3aed] disabled:opacity-60" data-testid="auth-submit">{loading ? <Loader2 className="animate-spin" /> : <>{mode === "login" ? "دخول" : "إنشاء الحساب"}<ArrowUpLeft size={17} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></>}</button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="mt-6 w-full text-center text-sm text-white/48 transition-colors hover:text-white" data-testid="auth-switch">{mode === "login" ? "ليس لديك حساب؟ أنشئ حساباً جديداً" : "لديك حساب بالفعل؟ سجّل الدخول"}</button>
    </motion.section>
  </main>;
}
