"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Expand, MoveHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const series = {
  sustainability: {
    label: "فلسفة الاستدامة",
    description: "قراءات بصرية في الزمن، والتجدّد، والأثر الذي يستمر دون أن يستنزف مصدره.",
    posters: [
      { src: "/posters/sustainability/01-source.webp", title: "الأثر ومصدره" },
      { src: "/posters/sustainability/02-renewal.webp", title: "التجدّد من الداخل" },
      { src: "/posters/sustainability/03-tomorrow.webp", title: "حق الغد" },
      { src: "/posters/sustainability/04-growth.webp", title: "النمو والأصل" },
      { src: "/posters/sustainability/05-space.webp", title: "قيمة الفراغ" },
      { src: "/posters/sustainability/06-meaning.webp", title: "بقاء المعنى" },
      { src: "/posters/sustainability/07-covenant.webp", title: "عهد الزمن" },
    ],
    },
  contingency: {
    label: "Contingency Plan",
    description: "الخطة البديلة لا تتنبأ بالفشل؛ بل تمنح القرار مساحةً أخرى حين يتوقف المسار الأول.",
    posters: [
      { src: "/posters/contingency/01-alternative.webp", title: "صناعة البديل" },
      { src: "/posters/contingency/02-responsible.webp", title: "بديل مسؤول" },
      { src: "/posters/contingency/03-last-chance.webp", title: "فرصة أخرى" },
      { src: "/posters/contingency/04-turn.webp", title: "الوجهة الجديدة" },
      { src: "/posters/contingency/05-route.webp", title: "الخطر والانقطاع" },
      { src: "/posters/contingency/06-recognition.webp", title: "اعتراف متأخر" },
      { src: "/posters/contingency/07-what-if.webp", title: "ماذا لو؟" },
    ],
  },
  maximization: {
    label: "Maximization",
    description: "التعظيم ليس طلب المزيد دائمًا؛ بل تحرير أقصى أثر ممكن من الموارد المتاحة بأقل هدر.",
    posters: [
      { src: "/posters/maximization/01-return.webp", title: "أقصى عائد" },
      { src: "/posters/maximization/02-small-decisions.webp", title: "القرارات الصغيرة" },
      { src: "/posters/maximization/03-value.webp", title: "تعظيم القيمة" },
      { src: "/posters/maximization/04-focus.webp", title: "تكثيف الجهد" },
      { src: "/posters/maximization/05-outcomes.webp", title: "استحقاق التعظيم" },
      { src: "/posters/maximization/06-sustainable-growth.webp", title: "النمو المستدام" },
      { src: "/posters/maximization/07-impact.webp", title: "تعظيم الأثر" },
    ],
  },
  illogic: {
    label: "اللامنطق في المنطق",
    description: "ليس كل انتظام حقيقة، ولا كل تناقض خطأ؛ أحيانًا يبدأ الفهم حين نفكك يقين القاعدة.",
    posters: [
      { src: "/posters/logic-illogic/01-correct-result.webp", title: "نتيجة صحيحة" },
      { src: "/posters/logic-illogic/02-explained.webp", title: "المنطق الذي يفسّر" },
      { src: "/posters/logic-illogic/03-rule.webp", title: "حين تصبح القاعدة قيدًا" },
      { src: "/posters/logic-illogic/04-contradiction.webp", title: "التناقض الأوسع" },
      { src: "/posters/logic-illogic/05-measure.webp", title: "ما لا يقبل القياس" },
      { src: "/posters/logic-illogic/06-center.webp", title: "مركز العالم" },
      { src: "/posters/logic-illogic/07-exception.webp", title: "الاستثناء" },
    ],
  },
  reconfiguration: {
    label: "إعادة التهيئة والاستعداد",
    description: "الاستعداد ليس انتظار القادم؛ بل إعادة بناء الداخل كي نرى في التحول إمكانًا لا صدمة.",
    posters: [
      { src: "/posters/reconfiguration/01-future.webp", title: "بناء المستقبل" },
      { src: "/posters/reconfiguration/02-system.webp", title: "غيّر قابلية النظام" },
      { src: "/posters/reconfiguration/03-shock.webp", title: "التحول قبل الصدمة" },
      { src: "/posters/reconfiguration/04-today.webp", title: "استعداد اليوم" },
      { src: "/posters/reconfiguration/05-reconnect.webp", title: "إعادة التهيئة" },
      { src: "/posters/reconfiguration/06-flexibility.webp", title: "مرونة توزيع القوة" },
      { src: "/posters/reconfiguration/07-readiness.webp", title: "الجاهز يبدأ من الصفر" },
    ],
  },
  impact: {
    label: "الأثر وصناعة القيمة",
    description: "القيمة لا تكتمل بما تحققه من ربح، بل بما يبقى من أثر حين تنتهي دفاتر الحساب.",
    posters: [
      { src: "/posters/impact-value/01-root.webp", title: "جذر القيمة" },
      { src: "/posters/impact-value/02-survival.webp", title: "ما يستحق البقاء" },
      { src: "/posters/impact-value/03-spend-and-ask.webp", title: "المنفعة والقيمة" },
      { src: "/posters/impact-value/04-beyond-ledgers.webp", title: "ما بعد الحساب" },
      { src: "/posters/impact-value/05-continuity.webp", title: "قيمة تستحق الاستمرار" },
      { src: "/posters/impact-value/06-transformation.webp", title: "صناعة القيمة" },
      { src: "/posters/impact-value/07-life.webp", title: "من المنتج إلى الحياة" },
    ],
  },
  nucleus: {
    label: "النواة والظل",
    description: "كل اتساع يبدأ من نواة؛ وكل أثر ظاهر هو ظلّ لمعنى صغير اختار أن يتجذّر في العمق.",
    posters: [
      { src: "/posters/nucleus-shadow/01-extension.webp", title: "امتداد النواة" },
      { src: "/posters/nucleus-shadow/02-shadow.webp", title: "اتساع الظل" },
      { src: "/posters/nucleus-shadow/03-roots.webp", title: "الجذر أولًا" },
      { src: "/posters/nucleus-shadow/04-tree.webp", title: "بداية الشجرة" },
      { src: "/posters/nucleus-shadow/05-value-shadow.webp", title: "ظل القيمة" },
      { src: "/posters/nucleus-shadow/06-world.webp", title: "النواة تغيّر العالم" },
      { src: "/posters/nucleus-shadow/07-small-core.webp", title: "نواة صغيرة" },
    ],
  },
  fission: {
    label: "انشطار القيمة",
    description: "تأملات في القيمة حين تنقسم دون أن تنقص؛ فتغادر مركزها لتتكاثر أثرًا ومعنىً في محيطها.",
    posters: [
      { src: "/posters/value-fission/01-liberated-impact.webp", title: "تحرير الأثر" },
      { src: "/posters/value-fission/02-market-and-meaning.webp", title: "السوق والمعنى" },
      { src: "/posters/value-fission/03-shared-value.webp", title: "قيمة تُشارك" },
      { src: "/posters/value-fission/04-distributed-impact.webp", title: "توزّع الأثر" },
      { src: "/posters/value-fission/05-value-fission.webp", title: "انشطار القيمة" },
      { src: "/posters/value-fission/06-replicable-impact.webp", title: "أثر قابل للتكاثر" },
      { src: "/posters/value-fission/07-meaning-multiplies.webp", title: "المعنى يتكاثر" },
    ],
  },
  singularity: {
    label: "The Singularity",
    description: "برامج تستشرف ما بعد التحول؛ حيث تتسارع المعرفة، وتتغير نماذج الأعمال، وتُعاد كتابة المستقبل.",
    posters: [
      { src: "/posters/singularity/01-singularity.webp", title: "The Singularity" },
      { src: "/posters/singularity/02-intelligence.webp", title: "الذكاء الاصطناعي للأعمال" },
      { src: "/posters/singularity/03-foresight.webp", title: "استشراف المستقبل" },
      { src: "/posters/singularity/04-planning.webp", title: "المخططات التكيفية" },
      { src: "/posters/singularity/05-models.webp", title: "نماذج الأعمال المستقبلية" },
      { src: "/posters/singularity/06-leadership.webp", title: "قيادة ما بعد التحول" },
      { src: "/posters/singularity/07-future-now.webp", title: "الحاضر من المستقبل" },
    ],
  },
  abundance: {
    label: "النفقة والبركة",
    description: "تأملات بصرية في عطاءٍ يخرج من الحساب، ليعود أثرًا وأجرًا وبركةً تتجاوز منطق العدد.",
    posters: [
      { src: "/posters/abundance/01-reward.webp", title: "ما تنفقه لله" },
      { src: "/posters/abundance/02-beyond-number.webp", title: "من العدد إلى البركة" },
      { src: "/posters/abundance/03-endless-effect.webp", title: "أثر بلا عدد" },
      { src: "/posters/abundance/04-what-remains.webp", title: "ما يبقى لك" },
      { src: "/posters/abundance/05-logic-of-blessing.webp", title: "منطق البركة" },
      { src: "/posters/abundance/06-seed.webp", title: "النفقة بذرة" },
      { src: "/posters/abundance/07-increase.webp", title: "زيادة تتجاوز الرقم" },
    ],
  },
} as const;

const seriesOrder: Array<keyof typeof series> = ["sustainability", "contingency", "maximization", "illogic", "reconfiguration", "impact", "nucleus", "fission", "abundance", "singularity"];
const seriesOrdinals = ["الأولى", "الثانية", "الثالثة", "الرابعة", "الخامسة", "السادسة", "السابعة", "الثامنة", "التاسعة", "العاشرة"];

export default function PosterWall() {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeSeries, setActiveSeries] = useState<keyof typeof series>("sustainability");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const railRef = useRef<HTMLDivElement>(null);
  const currentSeries = series[activeSeries];
  const posters = currentSeries.posters;

  const move = useCallback((step: number) => {
    railRef.current?.scrollBy({ left: step * Math.min(430, window.innerWidth * .72), behavior: "smooth" });
  }, []);

  const changePoster = useCallback((step: number) => {
    setSelected((current) => current === null ? 0 : (current + step + posters.length) % posters.length);
  }, [posters.length]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") changePoster(1);
      if (event.key === "ArrowRight") changePoster(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, changePoster]);

  return (
    <section className="poster-wall" id="poster-wall" aria-labelledby="poster-wall-title">
      <div className="poster-wall-head">
        <div>
          <span className="section-no light">05 / حائط الأفكار</span>
          <h2 id="poster-wall-title">أفكارٌ تُرى.<br /><em>ومعانٍ تبقى.</em></h2>
        </div>
        <div className="poster-wall-note">
          <span>السلسلة {seriesOrdinals[seriesOrder.indexOf(activeSeries)]}</span>
          <h3>{currentSeries.label}</h3>
          <p>{currentSeries.description}</p>
          <small><MoveHorizontal size={14} /> حرّك المؤشر لاستكشاف الحائط — واضغط للتكبير</small>
        </div>
      </div>

      <div className="series-switch" role="tablist" aria-label="سلاسل حائط الأفكار">
        {seriesOrder.map((key, index) => (
          <button key={key} type="button" role="tab" aria-selected={activeSeries === key} className={activeSeries === key ? "active" : ""} onClick={() => { setActiveSeries(key); setSelected(null); railRef.current?.scrollTo({ left: 0, behavior: "smooth" }); }}>
            <span>0{index + 1}</span>{series[key].label}<b>{series[key].posters.length}</b>
          </button>
        ))}
      </div>

      <div className="poster-stage" onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({ x: ((event.clientX - rect.left) / rect.width - .5) * 10, y: ((event.clientY - rect.top) / rect.height - .5) * -5 });
      }} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
        <div className="poster-stage-glow" aria-hidden="true" />
        <button className="wall-control wall-control-prev" onClick={() => move(1)} aria-label="الصور السابقة"><ChevronRight /></button>
        <div className="poster-rail" key={activeSeries} ref={railRef} style={{ "--wall-rotate-x": `${tilt.y}deg`, "--wall-rotate-y": `${tilt.x}deg` } as CSSProperties}>
          {posters.map((poster, index) => (
            <button className={`poster-card poster-card-${index + 1}`} type="button" key={poster.src} onClick={() => setSelected(index)} aria-label={`عرض بوستر: ${poster.title}`}>
              <span className="poster-frame"><img src={poster.src} alt={`بوستر ${poster.title} من سلسلة فلسفة الاستدامة`} loading={index > 2 ? "lazy" : "eager"} /></span>
              <span className="poster-caption"><b>0{index + 1}</b>{poster.title}<Expand size={15} /></span>
            </button>
          ))}
        </div>
        <button className="wall-control wall-control-next" onClick={() => move(-1)} aria-label="الصور التالية"><ChevronLeft /></button>
        <div className="wall-depth-line" aria-hidden="true" />
      </div>

      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="poster-dialog" showCloseButton>
          <DialogTitle className="poster-dialog-title">{selected !== null ? posters[selected].title : "حائط الأفكار"}</DialogTitle>
          <DialogDescription className="poster-dialog-description">من سلسلة {currentSeries.label} — فرح التنمية</DialogDescription>
          {selected !== null && <>
            <div className="poster-viewer">
              <button className="viewer-arrow viewer-prev" onClick={() => changePoster(-1)} aria-label="البوستر السابق"><ChevronRight /></button>
              <img src={posters[selected].src} alt={`بوستر ${posters[selected].title}`} />
              <button className="viewer-arrow viewer-next" onClick={() => changePoster(1)} aria-label="البوستر التالي"><ChevronLeft /></button>
              <div className="viewer-meta"><span>{String(selected + 1).padStart(2, "0")} / {String(posters.length).padStart(2, "0")}</span><strong>{posters[selected].title}</strong></div>
            </div>
            <div className="viewer-thumbs" aria-label="اختيار بوستر">
              {posters.map((poster, index) => <button key={poster.src} className={index === selected ? "active" : ""} onClick={() => setSelected(index)} aria-label={poster.title}><img src={poster.src} alt="" /></button>)}
            </div>
          </>}
        </DialogContent>
      </Dialog>
    </section>
  );
}
