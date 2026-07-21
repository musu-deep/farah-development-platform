import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="grain overflow-hidden bg-ink pb-9 pt-20 text-white" data-testid="footer">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-6"><Logo dark footer /><p className="mt-6 max-w-xl leading-8 text-white/48">بيت خبرة سعودي يبني حلولاً إدارية وتنموية قابلة للقياس، ويحوّل الاستراتيجية إلى قدرة مؤسسية ونتائج مستدامة.</p></div>
          <div className="md:col-span-3"><h3 className="mb-5 text-xs font-bold tracking-[.2em] text-white/35">استكشف</h3><div className="space-y-3 text-white/65"><a href="/#services" className="block hover:text-white">الخدمات</a><a href="/#approach" className="block hover:text-white">المنهجية</a><a href="/#work" className="block hover:text-white">أعمالنا</a><Link to="/auth" className="block hover:text-white">بوابة العملاء</Link></div></div>
          <div className="md:col-span-3"><h3 className="mb-5 text-xs font-bold tracking-[.2em] text-white/35">تواصل</h3><div className="space-y-3 text-white/65"><p>المملكة العربية السعودية</p><p dir="ltr" className="text-end">info@farah-development.com</p><p dir="ltr" className="text-end">+966 11 000 0000</p></div></div>
        </div>
        <div className="flex flex-col gap-3 pt-7 text-sm text-white/35 md:flex-row md:items-center md:justify-between"><p>© {new Date().getFullYear()} شركة فرح التنمية. جميع الحقوق محفوظة.</p><p>الخصوصية · شروط الاستخدام</p></div>
      </div>
    </footer>
  );
}
