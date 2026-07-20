const map = {
  new: ["جديد", "bg-violet/15 text-violet"],
  in_progress: ["قيد التنفيذ", "bg-amber-500/15 text-amber-400"],
  waiting_client: ["بانتظار العميل", "bg-sky-500/15 text-sky-400"],
  completed: ["مكتمل", "bg-emerald/15 text-emerald"],
  cancelled: ["ملغي", "bg-red-500/15 text-red-400"],
};
export default function StatusBadge({ status }) {
  const [label, style] = map[status] || map.new;
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${style}`}>{label}</span>;
}
