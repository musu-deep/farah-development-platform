"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Expand, MoveHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const posters = [
  { src: "/posters/sustainability/01-source.webp", title: "الأثر ومصدره" },
  { src: "/posters/sustainability/02-renewal.webp", title: "التجدّد من الداخل" },
  { src: "/posters/sustainability/03-tomorrow.webp", title: "حق الغد" },
  { src: "/posters/sustainability/04-growth.webp", title: "النمو والأصل" },
  { src: "/posters/sustainability/05-space.webp", title: "قيمة الفراغ" },
  { src: "/posters/sustainability/06-meaning.webp", title: "بقاء المعنى" },
  { src: "/posters/sustainability/07-covenant.webp", title: "عهد الزمن" },
];

export default function PosterWall() {
  const [selected, setSelected] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const railRef = useRef<HTMLDivElement>(null);

  const move = useCallback((step: number) => {
    railRef.current?.scrollBy({ left: step * Math.min(430, window.innerWidth * .72), behavior: "smooth" });
  }, []);

  const changePoster = useCallback((step: number) => {
    setSelected((current) => current === null ? 0 : (current + step + posters.length) % posters.length);
  }, []);

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
          <span>السلسلة الأولى</span>
          <h3>فلسفة الاستدامة</h3>
          <p>قراءات بصرية في الزمن، والتجدّد، والأثر الذي يستمر دون أن يستنزف مصدره.</p>
          <small><MoveHorizontal size={14} /> حرّك المؤشر لاستكشاف الحائط — واضغط للتكبير</small>
        </div>
      </div>

      <div className="poster-stage" onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({ x: ((event.clientX - rect.left) / rect.width - .5) * 10, y: ((event.clientY - rect.top) / rect.height - .5) * -5 });
      }} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
        <div className="poster-stage-glow" aria-hidden="true" />
        <button className="wall-control wall-control-prev" onClick={() => move(1)} aria-label="الصور السابقة"><ChevronRight /></button>
        <div className="poster-rail" ref={railRef} style={{ "--wall-rotate-x": `${tilt.y}deg`, "--wall-rotate-y": `${tilt.x}deg` } as CSSProperties}>
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
          <DialogDescription className="poster-dialog-description">من سلسلة فلسفة الاستدامة — فرح التنمية</DialogDescription>
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
