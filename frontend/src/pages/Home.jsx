import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpLeft, Check, Loader2, Quote, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api, apiError } from "../lib";
import { useAuth } from "../context/AuthContext";
import { cases, methodology, services } from "../data/content";

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [.16, 1, .3, 1] } } };

function SectionLabel({ children, light = false }) {
  return <div className={`mb-5 flex items-center gap-3 text-xs font-bold tracking-[.18em] ${light ? "text-violet-200" : "text-plum/60"}`}><span className="h-px w-10 bg-current" />{children}</div>;
}

export default function Home() {
  const heroRef = useRef(null);
  const { user } = useAuth();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 55]);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: services[0].title, message: "", preferred_date: "", urgency: "normal" });

  useEffect(() => {
    if (user) setForm((current) => ({ ...current, name: current.name || user.name || "", email: current.email || user.email || "", phone: current.phone || user.phone || "", company: current.company || user.company || "" }));
  }, [user]);

  const set = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  async function submit(event) {
    event.preventDefault(); setSending(true);
    try {
      await api.post("/consultations", form);
      toast.success("تم استلام طلبك بنجاح. سيتواصل فريق فرح معك.");
      setForm((current) => ({ ...current, message: "", preferred_date: "", urgency: "normal" }));
    } catch (error) { toast.error(apiError(error)); }
    finally { setSending(false); }
  }

  return <main data-testid="home-page">
    <section ref={heroRef} className="grain relative min-h-[94vh] overflow-hidden bg-ink text-white" data-testid="hero">
      <motion.div style={{ y: imageY }} className="absolute inset-y-0 start-0 w-full opacity-35 lg:w-[58%]">
        <img src="https://images.pexels.com/photos/11888493/pexels-photo-11888493.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="عمارة تجريدية" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-y-0 end-0 w-2/3 bg-gradient-to-l from-ink via-ink/75 to-transparent" />
      </motion.div>
      <div className="absolute inset-0 soft-grid opacity-20" />
      <motion.div style={{ y: textY }} className="relative z-10 mx-auto flex min-h-[94vh] max-w-[1460px] items-end px-6 pb-16 pt-32 lg:px-10 lg:pb-24">
        <div className="grid w-full gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <motion.div initial="hidden" animate="visible" variants={reveal}><SectionLabel light>شركة استشارات وتطوير مؤسسي</SectionLabel></motion.div>
            <h1 className="font-display display-tight max-w-5xl text-[clamp(3.1rem,7.4vw,8.1rem)] font-black">
              {["نبني الكيانات", "ونطوّر القدرات،", "بمعايير عالمية."].map((line, index) => <span key={line} className="block overflow-hidden"><motion.span initial={{ y: "115%" }} animate={{ y: 0 }} transition={{ delay: .12 + index * .13, duration: .85, ease: [.16, 1, .3, 1] }} className={`block ${index === 2 ? "text-violet" : ""}`}>{line}</motion.span></span>)}
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7, duration: .7 }} className="lg:col-span-4 lg:pb-4">
            <p className="max-w-lg text-lg leading-9 text-white/62">بيت خبرة سعودي يقدّم حلولاً استراتيجية في الاستشارات وريادة الأعمال وبناء القدرات وإعادة الهيكلة ومراجعة الأداء. نرافق القيادات والكيانات من التشخيص إلى التنفيذ، ونبني استراتيجيات وهياكل وقدرات ومؤشرات تجعل التحول مرئياً وقابلاً للقياس.</p>
            <div className="mt-8 flex flex-wrap gap-3"><button onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })} className="group inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 font-bold transition-colors hover:bg-[#7c3aed]" data-testid="hero-cta-button">ابدأ جلسة التشخيص <ArrowUpLeft size={18} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></button><button onClick={() => document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-white/75 transition-colors hover:bg-white/8 hover:text-white">اكتشف خدماتنا <ArrowDown size={17} /></button></div>
          </motion.div>
        </div>
      </motion.div>
    </section>

    <section className="overflow-hidden border-y border-plum/10 bg-mist py-7"><div className="flex w-max animate-[marquee_35s_linear_infinite] gap-24 whitespace-nowrap text-lg font-bold text-plum/55">{[...Array(2)].flatMap(() => ["الاستراتيجية التي لا تُنفذ ليست استراتيجية", "القدرة المؤسسية أصلٌ لا مصروف", "الأثر يبدأ بسؤال صحيح", "البيانات تعطي القرار ذاكرة"]).map((item, index) => <span key={index} className="flex items-center gap-8"><Sparkles size={15} className="text-violet" />{item}</span>)}</div></section>

    <section className="bg-pearl py-24 lg:py-36" id="services" data-testid="services">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={reveal} className="mb-14 grid gap-8 lg:grid-cols-12"><div className="lg:col-span-7"><SectionLabel>قدراتنا الاستشارية</SectionLabel><h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">خبرة مصممة<br />حول تحديكم.</h2></div><p className="self-end text-lg leading-9 text-plum/65 lg:col-span-4 lg:col-start-9">لا نبيع حزمة جاهزة. نكوّن فريقاً ومنهجاً ونطاقاً يعكس وضع الكيان ودرجة نضجه والنتيجة التي يسعى إليها.</p></motion.div>
        <div className="grid auto-rows-[minmax(250px,auto)] gap-4 lg:grid-cols-4">
          {services.map((service, index) => { const Icon = service.icon; const dark = service.tone === "dark"; const violet = service.tone === "violet"; return <motion.article key={service.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * .06 }} className={`group relative overflow-hidden p-7 lg:p-9 ${service.span} ${dark ? "bg-ink text-white" : violet ? "bg-violet text-white" : "border border-plum/12 bg-mist text-deep"}`} data-testid={`service-${service.id}`}>
            <div className="flex h-full flex-col justify-between"><div><Icon size={28} className={dark || violet ? "text-violet-200" : "text-violet"} /><p className={`mt-8 text-sm ${dark || violet ? "text-white/45" : "text-plum/48"}`}>{service.short}</p><h3 className="mt-3 font-display text-3xl font-bold leading-tight">{service.title}</h3></div><p className={`mt-10 max-w-xl leading-8 ${dark || violet ? "text-white/58" : "text-plum/65"}`}>{service.description}</p></div><div className="absolute -bottom-20 -start-20 h-40 w-40 rounded-full bg-violet/20 blur-3xl transition-transform duration-500 group-hover:scale-150" />
          </motion.article>; })}
        </div>
      </div>
    </section>

    <section className="bg-ink py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-[1400px] divide-y divide-white/10 px-6 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse lg:divide-y-0 lg:px-10">{[["+120", "مشروعاً وبرنامجاً"], ["18", "قطاعاً تم خدمتها"], ["92%", "توصيات قابلة للتنفيذ"], ["4.8/5", "رضا الشركاء"]].map(([number, label], index) => <motion.div key={label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="py-9 lg:px-9 lg:py-4"><p className="font-display text-6xl font-bold text-violet lg:text-7xl">{number}</p><p className="mt-2 text-white/45">{label}</p></motion.div>)}</div>
    </section>

    <section id="approach" className="bg-mist py-24 lg:py-36" data-testid="approach">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10"><div className="grid gap-14 lg:grid-cols-12"><div className="lg:col-span-4"><div className="sticky top-32"><SectionLabel>منهجية فرح</SectionLabel><h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">من السؤال<br />إلى النتيجة.</h2><p className="mt-7 max-w-md leading-8 text-plum/60">منهجية تجمع البعد التحليلي، التصميم التشاركي، والدقة التنفيذي.</p></div></div><div className="lg:col-span-7 lg:col-start-6">{methodology.map((item, index) => <motion.article key={item.number} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} className="grid gap-5 border-t border-plum/15 py-10 md:grid-cols-[110px_1fr]"><div className="font-display text-6xl font-bold text-violet/45">{item.number}</div><div><h3 className="font-display text-3xl font-bold text-deep">{item.title}</h3><p className="mt-4 max-w-2xl text-lg leading-9 text-plum/62">{item.text}</p></div></motion.article>)}</div></div></div>
    </section>

    <section id="work" className="bg-pearl py-24 lg:py-36" data-testid="work">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10"><div className="mb-14 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><SectionLabel>مختارات من أعمالنا</SectionLabel><h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">أثرٌ يتحدث<br />بلغة الأرقام.</h2></div><p className="max-w-md leading-8 text-plum/58">نماذج توضيحية لطبيعة النتائج التي نستهدفها. تُعرض تفاصيل العملاء الفعلية وفق اتفاقيات السرية.</p></div><div className="grid gap-5 lg:grid-cols-12">{cases.map((item, index) => <motion.article key={item.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`group ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"}`}><div className={`relative overflow-hidden ${index === 2 ? "h-[420px]" : "h-[520px]"}`}><img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" /><div className="absolute inset-0 bg-ink/42" /><div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9"><p className="text-sm text-violet-200">{item.category}</p><h3 className="mt-2 max-w-2xl font-display text-3xl font-bold lg:text-4xl">{item.title}</h3><div className="mt-7 flex items-end gap-4"><span className="font-display text-5xl font-bold text-violet">{item.metric}</span><span className="max-w-[170px] pb-1 text-sm leading-6 text-white/55">{item.label}</span></div></div></div></motion.article>)}</div></div>
    </section>

    <section id="about" className="relative overflow-hidden bg-deep py-24 text-white lg:py-36" data-testid="about"><div className="absolute inset-y-0 start-0 w-1/2 opacity-25"><img src="https://images.pexels.com/photos/38096888/pexels-photo-38096888.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="مدينة الرياض" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-deep/35" /></div><div className="relative mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-12 lg:px-10"><div className="lg:col-span-6 lg:col-start-7"><SectionLabel light>عن فرح التنمية</SectionLabel><Quote className="text-violet" size={36} /><h2 className="mt-7 font-display display-tight text-5xl font-bold lg:text-7xl">نحن لا نترك خلفنا تقريراً فقط.</h2><p className="mt-8 text-xl leading-10 text-white/65">نترك قراراً أوضح، فريقاً أقدر، ونظاماً يمكنه الاستمرار. فرح التنمية شريك تنفيذي يجمع الاستشارة، التطوير، ونقل المعرفة تحت مظلة واحدة.</p><div className="mt-10 grid gap-4 sm:grid-cols-2">{["حلول مرتبطة بالسياق المحلي", "فرق متعددة التخصصات", "حوكمة واضحة للمشروعات", "تركيز صارم على الأثر"].map((item) => <p key={item} className="flex items-center gap-3 border-t border-white/12 pt-4 text-white/72"><Check size={17} className="text-emerald" />{item}</p>)}</div></div></div></section>

    <section id="contact" className="bg-pearl py-24 lg:py-36" data-testid="contact"><div className="mx-auto grid max-w-[1300px] gap-16 px-6 lg:grid-cols-12 lg:px-10"><div className="lg:col-span-5"><SectionLabel>ابدأ الحوار</SectionLabel><h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">ما التحدي الذي تريد حله؟</h2><p className="mt-7 max-w-md text-lg leading-9 text-plum/62">أرسل صورة مختصرة عن التحدي والنتيجة المطلوبة. يراجع الفريق الطلب ويحدد أنسب نقطة بداية.</p><div className="mt-10 border-s-2 border-violet ps-5"><p className="font-bold text-deep">جلسة التشخيص الأولي</p><p className="mt-1 text-sm leading-7 text-plum/55">فهم السياق، تحديد الفجوة، وتقدير نطاق التدخل المناسب.</p></div></div><form onSubmit={submit} className="grid gap-x-7 gap-y-4 border border-plum/12 bg-mist p-7 md:grid-cols-2 lg:col-span-7 lg:p-10" data-testid="consultation-form"><label><span className="text-sm font-bold text-plum/70">الاسم الكامل *</span><input required value={form.name} onChange={set("name")} className="input-line" data-testid="form-name" /></label><label><span className="text-sm font-bold text-plum/70">البريد الإلكتروني *</span><input required type="email" value={form.email} onChange={set("email")} className="input-line" data-testid="form-email" /></label><label><span className="text-sm font-bold text-plum/70">رقم الجوال</span><input value={form.phone} onChange={set("phone")} className="input-line" /></label><label><span className="text-sm font-bold text-plum/70">الجهة</span><input value={form.company} onChange={set("company")} className="input-line" /></label><label><span className="text-sm font-bold text-plum/70">الخدمة *</span><select value={form.service} onChange={set("service")} className="input-line" data-testid="form-service">{services.map((item) => <option key={item.id}>{item.title}</option>)}</select></label><label><span className="text-sm font-bold text-plum/70">درجة الأولوية</span><select value={form.urgency} onChange={set("urgency")} className="input-line"><option value="normal">طبيعية</option><option value="high">عالية</option><option value="critical">حرجة</option></select></label><label className="md:col-span-2"><span className="text-sm font-bold text-plum/70">صف التحدي والنتيجة المطلوبة *</span><textarea required minLength={10} rows="5" value={form.message} onChange={set("message")} className="input-line resize-none" data-testid="form-message" /></label><div className="mt-4 md:col-span-2"><button disabled={sending} className="group inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 font-bold text-white transition-colors hover:bg-deep disabled:opacity-60" data-testid="form-submit">{sending ? <Loader2 className="animate-spin" size={18} /> : <>إرسال طلب الاستشارة <ArrowUpLeft size={17} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></>}</button></div></form></div></section>
  </main>;
}
