import { BadgeCheck, BarChart3, Compass, GraduationCap, Network, Rocket } from "lucide-react";

export const services = [
  { id: "strategy", title: "الاستشارات الإدارية والتطويرية", short: "قرار أوضح. تنفيذ أسرع.", description: "نحوّل التحديات المعقدة إلى خيارات استراتيجية ونماذج تشغيل ومؤشرات أداء قابلة للتنفيذ والقياس.", icon: Compass, span: "lg:col-span-2 lg:row-span-2", tone: "dark" },
  { id: "entrepreneurship", title: "ريادة الأعمال", short: "من الفكرة إلى نموذج مستدام.", description: "تصميم نماذج الأعمال، دراسات الجدوى، الجاهزية الاستثمارية، وبرامج التسريع والنمو.", icon: Rocket, span: "lg:col-span-1", tone: "light" },
  { id: "capacity", title: "بناء القدرات والمهارات", short: "قادة وفرق جاهزة للمستقبل.", description: "أكاديميات تنفيذية، مسارات قيادية، ونقل معرفة مرتبط بالأداء الفعلي داخل المؤسسة.", icon: GraduationCap, span: "lg:col-span-1", tone: "violet" },
  { id: "qualification", title: "التأهيل والاعتماد", short: "جاهزية موثوقة للمعايير.", description: "تهيئة الأنظمة والسياسات والأدلة ومتطلبات الجودة والاعتماد المحلي والدولي.", icon: BadgeCheck, span: "lg:col-span-1", tone: "light" },
  { id: "restructuring", title: "إعادة الهيكلة التنظيمية", short: "هيكل يخدم الاستراتيجية.", description: "تصميم الوحدات والصلاحيات والحوكمة والوظائف وسلاسل القرار لرفع المرونة والإنتاجية.", icon: Network, span: "lg:col-span-1", tone: "dark" },
  { id: "performance", title: "مراجعة الأداء المؤسسي", short: "من الانطباع إلى الدليل.", description: "تشخيص شامل للأداء، لوحات مؤشرات، تحليل فجوات، وخارطة تحسين ذات أولويات واضحة.", icon: BarChart3, span: "lg:col-span-2", tone: "light" },
];

export const methodology = [
  { number: "01", title: "نفهم قبل أن نوصي", text: "نبدأ بالسياق، البيانات، أصحاب المصلحة، وجذور المشكلة—not الأعراض الظاهرة فقط." },
  { number: "02", title: "نصمم معكم لا بعيداً عنكم", text: "نحوّل فرق العمل إلى شركاء في الحل لضمان الواقعية، نقل المعرفة، وسرعة التبني." },
  { number: "03", title: "نربط الاستراتيجية بالتشغيل", text: "كل توصية تنتهي بمالك، موعد، مؤشر نجاح، وآلية متابعة واضحة." },
  { number: "04", title: "نقيس الأثر ونثبت التحسن", text: "نراقب النتائج، نصحح المسار، ونبني قدرة داخلية تستمر بعد انتهاء المشروع." },
];

export const cases = [
  { category: "تحول مؤسسي", title: "إعادة تصميم نموذج تشغيل لكيان متعدد الفروع", metric: "34%", label: "تحسن في زمن اتخاذ القرار", image: "https://images.pexels.com/photos/36405564/pexels-photo-36405564.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { category: "بناء قدرات", title: "أكاديمية قيادات مرتبطة بمؤشرات الأداء", metric: "91%", label: "نسبة إتمام المسارات التطبيقية", image: "https://images.pexels.com/photos/36765718/pexels-photo-36765718.jpeg?auto=compress&cs=tinysrgb&w=1400" },
  { category: "مراجعة أداء", title: "لوحة قيادة تنفيذية لبرنامج تنموي", metric: "12", label: "مؤشراً حرجاً جرى توحيدها", image: "https://images.pexels.com/photos/338400/pexels-photo-338400.jpeg?auto=compress&cs=tinysrgb&w=1400" },
];
