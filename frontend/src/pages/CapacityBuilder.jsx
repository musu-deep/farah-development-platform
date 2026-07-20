import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpLeft,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronLeft,
  CircleGauge,
  GraduationCap,
  Layers3,
  Network,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const dimensions = [
  {
    id: "strategy",
    title: "الاستراتيجية والاتجاه",
    short: "وضوح الأولويات وتحويلها إلى خطط قابلة للتنفيذ.",
    icon: Target,
    questions: [
      "لدينا أولويات استراتيجية واضحة ومفهومة لجميع القيادات.",
      "ترتبط المبادرات والميزانيات مباشرة بالأهداف الاستراتيجية.",
      "تُراجع الاستراتيجية دورياً بالاعتماد على البيانات والتغيرات.",
    ],
  },
  {
    id: "governance",
    title: "الحوكمة والقرار",
    short: "صلاحيات واضحة ومسارات قرار فعالة ورقابة مناسبة.",
    icon: ShieldCheck,
    questions: [
      "الأدوار والصلاحيات ومسؤوليات اللجان موثقة ومطبقة.",
      "يمكن تتبع القرارات والالتزامات ومتابعة تنفيذها بوضوح.",
      "توجد سياسات لإدارة المخاطر والامتثال والمساءلة.",
    ],
  },
  {
    id: "operations",
    title: "التشغيل والعمليات",
    short: "عمليات منضبطة تقلل الهدر وترفع جودة الخدمة.",
    icon: Layers3,
    questions: [
      "العمليات الأساسية موثقة ولها ملاك ومؤشرات أداء.",
      "توجد آلية منتظمة لتحسين الإجراءات وإزالة الاختناقات.",
      "تتكامل الوحدات دون ازدواجية أو انقطاع في تسليم المهام.",
    ],
  },
  {
    id: "people",
    title: "القيادة ورأس المال البشري",
    short: "قادة وفرق يمتلكون المهارات والسلوكيات اللازمة للمرحلة.",
    icon: UsersRound,
    questions: [
      "توجد خريطة واضحة للجدارات المطلوبة لكل دور حرج.",
      "ترتبط خطط التعلم بفجوات الأداء واحتياجات العمل الفعلية.",
      "توجد خطط تعاقب وتمكين للقيادات والصف الثاني.",
    ],
  },
  {
    id: "digital",
    title: "البيانات والتحول الرقمي",
    short: "قرارات مدعومة بالبيانات وأدوات رقمية تخدم التشغيل.",
    icon: BrainCircuit,
    questions: [
      "تتوفر بيانات موثوقة ومحدثة لصناعة القرار.",
      "تستخدم الأنظمة الرقمية لتقليل العمل اليدوي وتوحيد البيانات.",
      "توجد ضوابط مناسبة للأمن السيبراني والخصوصية وجودة البيانات.",
    ],
  },
  {
    id: "impact",
    title: "الأداء والأثر",
    short: "قياس النتائج وربط الموارد بالقيمة المتحققة.",
    icon: BarChart3,
    questions: [
      "لدينا مؤشرات متوازنة تقيس المخرجات والنتائج والأثر.",
      "تُناقش المؤشرات بانتظام وتؤدي إلى قرارات تصحيحية.",
      "يمكننا إثبات القيمة المتحققة للشركاء والمستفيدين.",
    ],
  },
];

const pathways = [
  {
    title: "المسار القيادي",
    label: "لصنّاع القرار والصف الثاني",
    icon: CircleGauge,
    items: ["القيادة الاستراتيجية", "صناعة القرار بالبيانات", "قيادة التغيير", "حوكمة الأداء"],
  },
  {
    title: "المسار المؤسسي",
    label: "لبناء الأنظمة والقدرة الداخلية",
    icon: Network,
    items: ["التشخيص المؤسسي", "تصميم نموذج التشغيل", "إدارة العمليات", "إدارة الجودة والمخاطر"],
  },
  {
    title: "المسار المهني",
    label: "لرفع كفاءة الفرق المتخصصة",
    icon: GraduationCap,
    items: ["جدارات وظيفية", "أكاديميات تخصصية", "مشروعات تطبيقية", "اعتماد ونقل معرفة"],
  },
  {
    title: "مسار التحول الرقمي",
    label: "لتحويل الأدوات إلى نتائج تشغيلية",
    icon: BrainCircuit,
    items: ["الثقافة الرقمية", "الذكاء الاصطناعي التطبيقي", "البيانات ولوحات القيادة", "أتمتة العمليات"],
  },
];

const scale = [
  { value: 1, label: "غير مطبق" },
  { value: 2, label: "محدود" },
  { value: 3, label: "جزئي" },
  { value: 4, label: "مطبق" },
  { value: 5, label: "راسخ" },
];

function levelFromScore(score) {
  if (score < 35) return { title: "تأسيسي", tone: "text-rose-300", summary: "الأولوية لبناء الأساس وتحديد المسؤوليات والعمليات الحرجة." };
  if (score < 55) return { title: "نامٍ", tone: "text-amber-300", summary: "توجد ممارسات جيدة لكنها تحتاج إلى توحيد وربط ومتابعة منتظمة." };
  if (score < 75) return { title: "متمكّن", tone: "text-violet-200", summary: "القدرة المؤسسية جيدة، والفرصة الآن في التكامل ورفع النضج والسرعة." };
  return { title: "متقدم", tone: "text-emerald-300", summary: "الكيان يمتلك أساساً متقدماً ويمكنه التركيز على الابتكار والتوسع والأثر." };
}

function SectionLabel({ children, light = false }) {
  return (
    <div className={`mb-5 flex items-center gap-3 text-xs font-bold tracking-[.16em] ${light ? "text-violet-200" : "text-plum/60"}`}>
      <span className="h-px w-10 bg-current" />
      {children}
    </div>
  );
}

export default function CapacityBuilder() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const questionCount = dimensions.reduce((total, dimension) => total + dimension.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const completion = Math.round((answeredCount / questionCount) * 100);

  const result = useMemo(() => {
    const dimensionScores = dimensions.map((dimension) => {
      const values = dimension.questions.map((_, index) => answers[`${dimension.id}-${index}`]).filter(Boolean);
      const score = values.length ? Math.round((values.reduce((sum, value) => sum + value, 0) / (dimension.questions.length * 5)) * 100) : 0;
      return { ...dimension, score };
    });
    const score = Math.round(dimensionScores.reduce((sum, dimension) => sum + dimension.score, 0) / dimensions.length);
    return { score, dimensionScores: dimensionScores.sort((a, b) => a.score - b.score), level: levelFromScore(score) };
  }, [answers]);

  function setAnswer(dimensionId, questionIndex, value) {
    setShowResult(false);
    setAnswers((current) => ({ ...current, [`${dimensionId}-${questionIndex}`]: value }));
  }

  function reset() {
    setAnswers({});
    setShowResult(false);
    document.querySelector("#assessment")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main data-testid="capacity-builder-page">
      <section className="grain relative min-h-[88vh] overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 soft-grid opacity-25" />
        <div className="absolute -start-24 top-28 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" />
        <div className="absolute -end-20 bottom-10 h-80 w-80 rounded-full bg-plum/60 blur-[110px]" />
        <div className="relative mx-auto grid min-h-[88vh] max-w-[1460px] items-end gap-14 px-6 pb-16 pt-36 lg:grid-cols-12 lg:px-10 lg:pb-24">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
              <SectionLabel light>مركز فرح لبناء القدرات</SectionLabel>
            </motion.div>
            <h1 className="font-display display-tight text-[clamp(3.3rem,7vw,7.5rem)] font-black">
              <span className="block">لا نبدأ</span>
              <span className="block">ببرنامج تدريبي.</span>
              <span className="block text-violet">نبدأ بالفجوة.</span>
            </h1>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35 }} className="lg:col-span-4 lg:pb-4">
            <p className="text-lg leading-9 text-white/65">منظومة تربط التشخيص المؤسسي بالجدارات والمسارات التطبيقية وقياس الأثر، حتى تتحول المعرفة إلى أداء داخل العمل.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.querySelector("#assessment")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 font-bold hover:bg-[#7c3aed]">ابدأ التشخيص <ArrowDown size={17} /></button>
              <Link to="/#contact" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-white/75 hover:bg-white/10 hover:text-white">تحدث مع مستشار <ArrowUpLeft size={17} /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel>من التدريب إلى القدرة</SectionLabel>
              <h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">منظومة واحدة، لا دورات متفرقة.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {[
                ["01", "تشخيص الفجوة", "قياس النضج والجدارات والأداء قبل تصميم أي تدخل."],
                ["02", "تصميم المسار", "تجربة تعلم مرتبطة بدور المتدرب وتحدياته ومؤشرات نجاحه."],
                ["03", "تطبيق داخل العمل", "مشروعات ومهام تطبيقية وإشراف يربط المعرفة بالنتائج."],
                ["04", "قياس الاستدامة", "قياس تغير السلوك والأداء ونقل المعرفة وبقاء الأثر."],
              ].map(([number, title, text]) => (
                <article key={number} className="border border-plum/12 bg-mist p-7">
                  <span className="font-display text-4xl font-bold text-violet/45">{number}</span>
                  <h3 className="mt-7 font-display text-2xl font-bold text-deep">{title}</h3>
                  <p className="mt-3 leading-8 text-plum/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="assessment" className="bg-mist py-24 lg:py-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="sticky top-28">
                <SectionLabel>التشخيص السريع</SectionLabel>
                <h2 className="font-display display-tight text-5xl font-bold text-deep">أين تقف قدرتكم المؤسسية؟</h2>
                <p className="mt-6 leading-8 text-plum/60">أجب عن 18 عبارة. النتيجة استرشادية وتساعد على تحديد نقطة البداية، وليست بديلاً عن التشخيص المهني المتعمق.</p>
                <div className="mt-8 border border-plum/12 bg-white p-5">
                  <div className="flex items-center justify-between text-sm font-bold text-plum/70"><span>اكتمال التشخيص</span><span>{completion}%</span></div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-plum/10"><motion.div animate={{ width: `${completion}%` }} className="h-full rounded-full bg-violet" /></div>
                  <p className="mt-3 text-sm text-plum/48">{answeredCount} من {questionCount} إجابة</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 lg:col-span-8">
              {dimensions.map((dimension, dimensionIndex) => {
                const Icon = dimension.icon;
                return (
                  <motion.article key={dimension.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: dimensionIndex * .04 }} className="border border-plum/12 bg-white p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-violet/10 text-violet"><Icon size={23} /></div>
                      <div><p className="text-xs font-bold text-violet">المحور {String(dimensionIndex + 1).padStart(2, "0")}</p><h3 className="mt-1 font-display text-2xl font-bold text-deep">{dimension.title}</h3><p className="mt-2 text-plum/55">{dimension.short}</p></div>
                    </div>
                    <div className="mt-7 divide-y divide-plum/10 border-t border-plum/10">
                      {dimension.questions.map((question, questionIndex) => {
                        const key = `${dimension.id}-${questionIndex}`;
                        return (
                          <div key={key} className="py-6">
                            <p className="font-bold leading-7 text-deep">{question}</p>
                            <div className="mt-4 grid grid-cols-5 gap-2">
                              {scale.map((item) => {
                                const active = answers[key] === item.value;
                                return (
                                  <button key={item.value} type="button" onClick={() => setAnswer(dimension.id, questionIndex, item.value)} className={`rounded-xl border px-2 py-3 text-center transition-all ${active ? "border-violet bg-violet text-white shadow-lg shadow-violet/15" : "border-plum/10 bg-mist text-plum/55 hover:border-violet/40 hover:text-deep"}`} aria-pressed={active}>
                                    <span className="block font-display text-xl font-bold">{item.value}</span>
                                    <span className="mt-1 hidden text-[11px] sm:block">{item.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.article>
                );
              })}

              <div className="flex flex-col gap-3 border border-plum/12 bg-deep p-6 text-white sm:flex-row sm:items-center sm:justify-between lg:p-8">
                <div><p className="font-display text-2xl font-bold">جاهز لإظهار النتيجة؟</p><p className="mt-2 text-white/55">أكمل جميع العبارات للحصول على قراءة متوازنة.</p></div>
                <button disabled={answeredCount !== questionCount} onClick={() => setShowResult(true)} className="inline-flex items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 font-bold disabled:cursor-not-allowed disabled:opacity-35">عرض نتيجة النضج <ChevronLeft size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showResult && (
        <section className="bg-ink py-24 text-white lg:py-32" id="result">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel light>نتيجة التشخيص</SectionLabel>
                <div className="relative mt-6 grid h-64 w-64 place-items-center rounded-full border border-white/15 bg-white/5">
                  <div className="absolute inset-4 rounded-full border-[14px] border-white/5" />
                  <div className="relative text-center"><p className="font-display text-7xl font-black text-violet">{result.score}</p><p className="text-white/45">من 100</p></div>
                </div>
                <p className={`mt-8 font-display text-4xl font-bold ${result.level.tone}`}>مستوى {result.level.title}</p>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/60">{result.level.summary}</p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <h3 className="font-display text-3xl font-bold">قراءة المحاور</h3>
                <div className="mt-7 space-y-5">
                  {result.dimensionScores.map((dimension) => {
                    const Icon = dimension.icon;
                    return (
                      <div key={dimension.id} className="border-t border-white/10 pt-5">
                        <div className="flex items-center justify-between gap-4"><p className="flex items-center gap-3 font-bold"><Icon size={18} className="text-violet-200" />{dimension.title}</p><span className="font-display text-2xl font-bold text-violet">{dimension.score}%</span></div>
                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8"><motion.div initial={{ width: 0 }} whileInView={{ width: `${dimension.score}%` }} viewport={{ once: true }} transition={{ duration: .8 }} className="h-full rounded-full bg-violet" /></div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-10 border border-violet/35 bg-violet/10 p-6">
                  <p className="text-sm font-bold text-violet-200">الأولوية المقترحة</p>
                  <p className="mt-2 font-display text-2xl font-bold">ابدأ بمحوري {result.dimensionScores[0]?.title} و{result.dimensionScores[1]?.title}</p>
                  <p className="mt-3 leading-8 text-white/58">يمكن تحويل هذه القراءة إلى خطة تدخل تتضمن تشخيصاً أعمق، مسارات تعلم، مشروعات تطبيقية، ومؤشرات أثر.</p>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to="/#contact" className="inline-flex items-center gap-2 rounded-full bg-violet px-6 py-3.5 font-bold hover:bg-[#7c3aed]">حوّل النتيجة إلى خطة <ArrowUpLeft size={17} /></Link>
                  <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-white/70 hover:bg-white/8 hover:text-white"><RefreshCw size={17} /> إعادة التشخيص</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-pearl py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-14 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7"><SectionLabel>مسارات التطوير</SectionLabel><h2 className="font-display display-tight text-5xl font-bold text-deep lg:text-7xl">تعلم مرتبط<br />بنتيجة مطلوبة.</h2></div>
            <p className="self-end text-lg leading-9 text-plum/60 lg:col-span-4 lg:col-start-9">كل مسار يُبنى وفق الفئة المستهدفة والفجوة ومؤشرات النجاح، ويمكن تنفيذه كأكاديمية أو برنامج أو رحلة تطوير داخلية.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <motion.article key={pathway.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className={`p-7 ${index === 0 ? "bg-violet text-white" : "border border-plum/12 bg-mist text-deep"}`}>
                  <Icon size={28} className={index === 0 ? "text-violet-200" : "text-violet"} />
                  <p className={`mt-8 text-sm ${index === 0 ? "text-white/55" : "text-plum/50"}`}>{pathway.label}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold">{pathway.title}</h3>
                  <ul className={`mt-7 space-y-3 ${index === 0 ? "text-white/70" : "text-plum/60"}`}>{pathway.items.map((item) => <li key={item} className="flex items-center gap-2"><Check size={15} className={index === 0 ? "text-violet-200" : "text-emerald"} />{item}</li>)}</ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-deep py-24 text-white lg:py-32">
        <div className="absolute inset-0 soft-grid opacity-15" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 px-6 lg:grid-cols-12 lg:items-center lg:px-10">
          <div className="lg:col-span-8"><div className="flex items-center gap-3 text-violet-200"><Sparkles size={18} /><span className="text-sm font-bold">منصة واحدة من التشخيص إلى الأثر</span></div><h2 className="mt-5 font-display display-tight text-5xl font-bold lg:text-7xl">ابنِ القدرة التي يبقى أثرها بعد انتهاء البرنامج.</h2></div>
          <div className="lg:col-span-4"><Link to="/#contact" className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-deep hover:bg-violet hover:text-white">ابدأ مع فريق فرح <ArrowUpLeft size={19} className="transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" /></Link><p className="mt-4 text-sm leading-7 text-white/45">جلسة أولية لتحديد الفجوة، الفئة المستهدفة، والنتيجة التي يجب أن يحققها المسار.</p></div>
        </div>
      </section>
    </main>
  );
}
