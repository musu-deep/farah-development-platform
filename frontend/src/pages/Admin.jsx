import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart3, Building2, CheckCircle2, Inbox, LogOut, Mail, PlayCircle, Search, Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import Logo from "../components/Logo";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { api, apiError, formatDate } from "../lib";

const statuses = [
  ["new", "جديد"], ["in_progress", "قيد التنفيذ"], ["waiting_client", "بانتظار العميل"], ["completed", "مكتمل"], ["cancelled", "ملغي"],
];

export default function Admin() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState({});
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function load() {
    const [consultations, summary] = await Promise.all([api.get("/consultations"), api.get("/admin/stats")]);
    setItems(consultations.data); setStats(summary.data);
  }
  useEffect(() => { load().catch((error) => toast.error(apiError(error))); }, []);

  const filtered = useMemo(() => items.filter((item) => {
    const matchesStatus = filter === "all" || item.status === filter;
    const haystack = `${item.name} ${item.email} ${item.company || ""} ${item.service}`.toLowerCase();
    return matchesStatus && haystack.includes(query.toLowerCase());
  }), [items, filter, query]);

  async function update(item, status) {
    try {
      const { data } = await api.patch(`/consultations/${item.id}`, { status, admin_note: notes[item.id] ?? item.admin_note ?? null });
      setItems((current) => current.map((row) => row.id === item.id ? data : row));
      const summary = await api.get("/admin/stats"); setStats(summary.data);
      toast.success("تم تحديث حالة الطلب");
    } catch (error) { toast.error(apiError(error)); }
  }
  async function exit() { await logout(); navigate("/"); }

  const chartData = statuses.map(([key, label]) => ({ name: label, value: stats?.[key] || 0 }));
  const cards = [
    ["إجمالي الطلبات", stats?.total || 0, Inbox, "text-violet"],
    ["العملاء", stats?.clients || 0, Users, "text-sky-400"],
    ["قيد التنفيذ", stats?.in_progress || 0, PlayCircle, "text-amber-400"],
    ["مكتملة", stats?.completed || 0, CheckCircle2, "text-emerald"],
  ];

  return <main className="min-h-screen bg-ink text-white" data-testid="admin-page">
    <header className="border-b border-white/10"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10"><Logo dark /><button onClick={exit} className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white"><LogOut size={16} /> خروج</button></div></header>
    <div className="mx-auto max-w-[1500px] px-6 py-12 lg:px-10 lg:py-16">
      <div><p className="text-sm font-bold text-violet-200">مركز العمليات</p><h1 className="mt-2 font-display text-4xl font-bold lg:text-5xl">إدارة الاستشارات والأداء</h1><p className="mt-3 text-white/40">رؤية موحدة للطلبات، الحالات، وتدفق العمل.</p></div>
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value, Icon, color]) => <div key={label} className="rounded-xl border border-white/10 p-5"><Icon className={color} size={22} /><p className="mt-5 font-display text-4xl font-bold">{value}</p><p className="mt-1 text-sm text-white/35">{label}</p></div>)}</section>
      <section className="mt-5 grid gap-5 lg:grid-cols-12"><div className="rounded-xl border border-white/10 p-5 lg:col-span-8"><div className="mb-4 flex items-center gap-2"><BarChart3 size={18} className="text-violet" /><h2 className="font-bold">توزيع حالات الطلبات</h2></div><div className="h-64" dir="ltr"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><CartesianGrid stroke="rgba(255,255,255,.08)" vertical={false} /><XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,.45)", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis allowDecimals={false} tick={{ fill: "rgba(255,255,255,.35)", fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: "#1A1525", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12 }} /><Bar dataKey="value" fill="#8B5CF6" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div></div><div className="rounded-xl border border-white/10 p-5 lg:col-span-4"><h2 className="font-bold">مؤشر الإنجاز</h2><p className="mt-7 font-display text-6xl font-bold text-emerald">{stats?.total ? Math.round((stats.completed / stats.total) * 100) : 0}%</p><p className="mt-2 text-sm leading-7 text-white/38">نسبة الطلبات المكتملة من إجمالي الطلبات المسجلة.</p></div></section>

      <section className="mt-10"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="relative w-full max-w-md"><Search size={17} className="absolute start-4 top-1/2 -translate-y-1/2 text-white/30" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="dark-input w-full ps-11" placeholder="ابحث بالاسم أو الجهة أو الخدمة..." data-testid="admin-search" /></div><div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">{[["all","الكل"], ...statuses].map(([key, label]) => <button key={key} onClick={() => setFilter(key)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${filter === key ? "bg-violet text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`} data-testid={`filter-${key}`}>{label}</button>)}</div></div>
        <div className="mt-6 space-y-4">{filtered.map((item, index) => <article key={item.id} className="rounded-xl border border-white/10 p-5 lg:p-6" data-testid={`admin-consultation-${index}`}><div className="grid gap-6 lg:grid-cols-[1fr_310px]"><div><div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-2xl font-bold">{item.name}</h3><StatusBadge status={item.status} /><span className={`rounded-full px-2.5 py-1 text-xs ${item.urgency === "critical" ? "bg-red-500/15 text-red-400" : item.urgency === "high" ? "bg-amber-500/15 text-amber-400" : "bg-white/5 text-white/35"}`}>{item.urgency === "critical" ? "أولوية حرجة" : item.urgency === "high" ? "أولوية عالية" : "أولوية طبيعية"}</span></div><p className="mt-2 text-sm font-bold text-violet-200">{item.service}</p><p className="mt-4 max-w-3xl leading-8 text-white/64">{item.message}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/32"><span>{formatDate(item.created_at)}</span><span className="flex items-center gap-1"><Mail size={13} /> {item.email}</span>{item.company && <span className="flex items-center gap-1"><Building2 size={13} /> {item.company}</span>}</div></div><div className="space-y-3 rounded-xl bg-white/[.035] p-4"><label className="block text-xs font-bold text-white/38">حالة الطلب<select value={item.status} onChange={(e) => update(item, e.target.value)} className="dark-input mt-2 w-full" data-testid={`status-select-${index}`}>{statuses.map(([key,label]) => <option key={key} value={key} className="bg-panel">{label}</option>)}</select></label><label className="block text-xs font-bold text-white/38">ملاحظة للعميل<textarea value={notes[item.id] ?? item.admin_note ?? ""} onChange={(e) => setNotes({ ...notes, [item.id]: e.target.value })} rows="3" className="dark-input mt-2 w-full resize-none" placeholder="مثال: تم تعيين المستشار..." /></label><button onClick={() => update(item, item.status)} className="w-full rounded-full border border-violet/40 px-4 py-2.5 text-sm font-bold text-violet-200 hover:bg-violet/10">حفظ الملاحظة</button></div></div></article>)}{filtered.length === 0 && <div className="rounded-xl border border-dashed border-white/12 py-14 text-center text-white/35">لا توجد نتائج مطابقة.</div>}</div>
      </section>
    </div>
  </main>;
}
