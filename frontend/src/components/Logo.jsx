export default function Logo({ compact = false, footer = false, className = "" }) {
  const size = footer
    ? "h-[88px] w-auto max-w-[320px] sm:h-[96px]"
    : compact
      ? "h-11 w-auto max-w-[150px]"
      : "h-[50px] w-auto max-w-[220px] lg:h-[56px] lg:max-w-[250px]";

  return (
    <img
      src="/farah-logo.svg"
      alt="فرح التنمية - Farah Development"
      width="480"
      height="120"
      className={`block object-contain object-right ${size} ${className}`}
      decoding="async"
    />
  );
}
