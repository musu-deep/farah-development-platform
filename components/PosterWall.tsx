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
} as const;

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
          <span>{activeSeries === "sustainability" ? "السلسلة الأولى" : "السلسلة الثانية"}</span>
          <h3>{currentSeries.label}</h3>
          <p>{currentSeries.description}</p>
          <small><MoveHorizontal size={14} /> حرّك المؤشر لاستكشاف الحائط — واضغط للتكبير</small>
        </div>
      </div>

      <div className="series-switch" role="tablist" aria-label="سلاسل حائط الأفكار">
        {(Object.keys(series) as Array<keyof typeof series>).map((key, index) => (
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
