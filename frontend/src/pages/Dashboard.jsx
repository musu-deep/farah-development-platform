import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpLeft, Building2, LogOut, Mail, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { api, formatDate } from "../lib";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const load = async () => { setLoading(true); try { const { data } = await api.get("/consultations/mine"); setItems(data); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);

  async function exit() { await logout(); navigate("/"); }
  return <main className="min-h-screen bg-ink text-white" data-testid="dashboard-page">
    <header className="border-b border-white/10"><div className="mx-auto flex max-w-[1250px] items-center justify-between px-6 py-5 lg:px-10"><Link to="/"><Logo dark /></Link><button onClick={exit} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"><LogOut size={16} /> خروج</button></div></header>
    <div className="mx-auto max-w-[1250px] px-6 py-14 lg:px-10 lg:py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold text-violet-200">بوابة العميل</p><h1 className="mt-2 font-display text-4xl font-bold lg:text-5xl">مرحباً، {user?.name}</h1><p className="mt-3 text-white/42">تابع حالة الطلبات وملاحظات فريق الاستشارة.</p></div><div className="flex gap-3"><button onClick={load} className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/60 hover:bg-white/5" aria-label="تحديث"><RefreshCw size={17} className={loading ? "animate-spin" : ""} /></button><Link to="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-violet px-5 py-3 font-bold">طلب استشارة جديد <ArrowUpLeft size={17} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></Link></div></div>
      <div className="mt-12 grid gap-4 md:grid-cols-3"><div className="rounded-xl border border-white/10 p-5"><p className="text-sm text-white/35">إجمالي الطلبات</p><p className="mt-2 font-display text-4xl font-bold">{items.length}</p></div><div className="rounded-xl border border-white/10 p-5"><p className="text-sm text-white/35">قيد المتابعة</p><p className="mt-2 font-display text-4xl font-bold text-violet">{items.filter((i) => ["new","in_progress","waiting_client"].includes(i.status)).length}</p></div><div className="rounded-xl border border-white/10 p-5"><p className="text-sm text-white/35">طلبات مكتملة</p><p className="mt-2 font-display text-4xl font-bold text-emerald">{items.filter((i) => i.status === "completed").length}</p></div></div>
      <section className="mt-8 space-y-4">{!loading && items.length === 0 && <div className="rounded-xl border border-dashed border-white/15 py-16 text-center text-white/42"><p>لا توجد طلبات استشارة بعد.</p><Link to="/#contact" className="mt-3 inline-block font-bold text-violet-200">ابدأ بطلبك الأول</Link></div>}{items.map((item, index) => <motion.article key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .05 }} className="rounded-xl border border-white/10 p-6 hover:border-violet/35" data-testid={`my-consultation-${index}`}><div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between"><div><div className="flex flex-wrap items-center gap-3"><p className="text-sm font-bold text-violet-200">{item.service}</p><StatusBadge status={item.status} /></div><p className="mt-4 max-w-3xl leading-8 text-white/68">{item.message}</p>{item.admin_note && <div className="mt-5 rounded-lg border border-violet/20 bg-violet/8 p-4"><p className="text-xs font-bold text-violet-200">ملاحظة فريق فرح</p><p className="mt-2 text-sm leading-7 text-white/65">{item.admin_note}</p></div>}<div className="mt-5 flex flex-wrap gap-4 text-xs text-white/32"><span>{formatDate(item.created_at)}</span>{item.company && <span className="flex items-center gap-1"><Building2 size={13} /> {item.company}</span>}<span className="flex items-center gap-1"><Mail size={13} /> {item.email}</span></div></div></div></motion.article>)}</section>
    </div>
  </main>;
}
