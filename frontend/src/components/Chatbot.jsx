import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageSquareText, Send, X } from "lucide-react";
import { api } from "../lib";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [messages, setMessages] = useState([{ role: "assistant", content: "مرحباً بك. صف لي التحدي الذي تواجهه وسأساعدك في تحديد الخدمة الأنسب والخطوة التالية." }]);
  const end = useRef(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  async function send() {
    const message = input.trim();
    if (!message || loading) return;
    setMessages((items) => [...items, { role: "user", content: message }]);
    setInput(""); setLoading(true);
    try {
      const { data } = await api.post("/chat", { session_id: sessionId, message });
      setMessages((items) => [...items, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((items) => [...items, { role: "assistant", content: "تعذر الاتصال بالمساعد حالياً. يمكنك إرسال طلب الاستشارة وسيعود الفريق إليك." }]);
    } finally { setLoading(false); }
  }

  return <>
    <button onClick={() => setOpen(!open)} className="fixed bottom-6 start-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-violet text-white shadow-violet transition-transform hover:scale-105" aria-label="مساعد فرح" data-testid="chatbot-toggle">{open ? <X /> : <MessageSquareText />}</button>
    <AnimatePresence>{open && <motion.section initial={{ opacity: 0, y: 24, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .97 }} className="fixed bottom-24 start-5 z-[70] flex h-[min(570px,72vh)] w-[min(390px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel/95 text-white shadow-2xl backdrop-blur-xl" data-testid="chatbot-panel">
      <div className="flex items-center gap-3 border-b border-white/10 bg-ink p-4"><div className="grid h-9 w-9 place-items-center bg-violet font-bold">ف</div><div><p className="font-bold">مساعد فرح الذكي</p><p className="text-xs text-emerald">متصل</p></div></div>
      <div className="no-scrollbar flex-1 space-y-4 overflow-y-auto p-4">{messages.map((item, index) => <div key={index} className={`flex ${item.role === "user" ? "justify-start" : "justify-end"}`}><p className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-7 ${item.role === "user" ? "rounded-bl-sm bg-white/8" : "rounded-br-sm bg-violet"}`}>{item.content}</p></div>)}{loading && <div className="flex justify-end"><Loader2 className="animate-spin text-violet" /></div>}<div ref={end} /></div>
      <div className="flex gap-2 border-t border-white/10 p-3"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} className="dark-input min-w-0 flex-1" placeholder="اكتب رسالتك..." data-testid="chatbot-input" /><button onClick={send} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-violet" data-testid="chatbot-send"><Send size={17} className="rotate-180" /></button></div>
    </motion.section>}</AnimatePresence>
  </>;
}
