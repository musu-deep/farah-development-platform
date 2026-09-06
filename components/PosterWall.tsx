"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <small>اختر أي بوستر لعرضه كاملًا</small>
        </div>
      </div>

      <div className="poster-grid">
        {posters.map((poster, index) => (
          <Dialog key={poster.src}>
            <DialogTrigger asChild>
              <button className={`poster-card poster-card-${index + 1}`} type="button" aria-label={`عرض بوستر: ${poster.title}`}>
                <img src={poster.src} alt={`بوستر ${poster.title} من سلسلة فلسفة الاستدامة`} loading={index > 1 ? "lazy" : "eager"} />
                <span><b>0{index + 1}</b>{poster.title}<i>↗</i></span>
              </button>
            </DialogTrigger>
            <DialogContent className="poster-dialog" showCloseButton>
              <DialogTitle className="poster-dialog-title">{poster.title}</DialogTitle>
              <DialogDescription className="poster-dialog-description">من سلسلة فلسفة الاستدامة — فرح التنمية</DialogDescription>
              <img src={poster.src} alt={`بوستر ${poster.title}`} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
