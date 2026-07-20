export default function Logo({ compact = false, dark = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center border border-violet/40 bg-violet text-xl font-black text-white shadow-violet">
        ف
      </div>
      {!compact && (
        <div>
          <div className={`font-display text-lg font-bold leading-none ${dark ? "text-white" : "text-deep"}`}>شركة فرح التنمية</div>
          <div className={`mt-1 text-[9px] font-bold tracking-[.24em] ${dark ? "text-white/45" : "text-plum/55"}`}>FARAH DEVELOPMENT</div>
        </div>
      )}
    </div>
  );
}
