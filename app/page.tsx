const services = [
  { n: "01", title: "الاستراتيجية والتطوير المؤسسي", text: "خطط قابلة للتنفيذ، نماذج تشغيلية، ومواءمة دقيقة بين التوجه والموارد والنتائج." },
  { n: "02", title: "تصميم المبادرات التنموية", text: "تحويل القضايا المجتمعية إلى مبادرات محكمة بمنطق أثر واضح وشراكات قابلة للنمو." },
  { n: "03", title: "الحوكمة والنضج المؤسسي", text: "أطر سياسات وصلاحيات وقرارات تعزز الثقة وترفع جاهزية المؤسسة للاستدامة." },
  { n: "04", title: "الدراسات وقياس الأثر", text: "دراسات واقع وجدوى واحتياج، ومؤشرات تقيس التغير الحقيقي لا كثافة النشاط." },
  { n: "05", title: "بناء القدرات", text: "برامج تطبيقية تنقل المعرفة إلى ممارسة مؤسسية وتبني كفاءات الفرق والقيادات." },
  { n: "06", title: "التحول الرقمي التنموي", text: "منصات وأدوات بيانات تجعل التقنية جزءاً من نموذج العمل وتجربة المستفيد." },
];
const sectors = ["الجمعيات الأهلية", "المؤسسات المانحة", "المسؤولية الاجتماعية", "الجهات الحكومية", "المبادرات المجتمعية"];
const imsGroups = [
  {
    code: "A",
    title: "وثائق النظام الأساسية",
    subtitle: "البنية المتكاملة وفق Annex SL",
    tools: ["دليل نظام الإدارة المتكامل", "سياسة IMS", "الأهداف ومؤشرات الأداء", "سياق المنظمة", "ضبط الوثائق والمعلومات", "الاتصال المؤسسي", "التدقيق الداخلي", "مراجعة الإدارة", "الإجراءات التصحيحية وحالات عدم المطابقة", "التحسين المستمر"]
  },
  {
    code: "B",
    title: "الأدوات التشغيلية والتخصصية",
    subtitle: "الجودة والبيئة والصحة والسلامة المهنية",
    tools: ["إدارة المشتريات والمورّدين", "خطة مشروع تطبيق المعايير", "تقييم المخاطر والفرص", "إدارة النفايات", "الكفاءة والتدريب والتوعية", "رضا العملاء", "الاستعداد والاستجابة للطوارئ", "الرصد والقياس والتحليل", "إدارة المستودعات", "المعايرة والصيانة", "إدارة التغيير", "تقييم الالتزام", "تشاور ومشاركة العاملين", "الجوانب والآثار البيئية", "سجل الجوانب والآثار", "تقييم المخاطر المهنية HIRA", "إدارة الموارد البشرية"]
  },
  {
    code: "C",
    title: "التحليل والتقييم المتقدم",
    subtitle: "أدوات تتجاوز الحزم التقليدية",
    tools: ["التقييم الذاتي المتكامل 9001 / 14001 / 45001", "ISO 10013:2021 للمعلومات الموثقة", "ISO 19011:2026 لتقييم التدقيق", "ISO 31000 للتقييم الذاتي للمخاطر", "أداة APQC الرئيسية لمؤشرات الأداء", "مقارنة ISO 14001:2015 مع إصدار 2026", "ISO 45002:2023 للتقييم الذاتي للصحة والسلامة"]
  }
];

export default function Home() {
  return <main dir="rtl">
    <header className="nav-wrap">
      <a className="brand brand-logo" href="#top" aria-label="فرح التنمية - الرئيسية"><img src="/farah-logo.png" alt="فرح التنمية"/></a>
      <nav aria-label="التنقل الرئيسي"><a href="#about">عن فرح</a><a href="#services">الخدمات</a><a href="#ims">نظام IMS</a><a href="#approach">منهجيتنا</a><a href="#knowledge">المعرفة</a></nav>
      <a className="nav-cta" href="#contact">ابدأ مشروعاً <span>↗</span></a>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy"><div className="eyebrow"><span/> بيت خبرة سعودي في التنمية المؤسسية</div><h1>تحويل الأفكار<br/><em>لمشاريع مستدامة.</em></h1><p>نرافق المؤسسات من وضوح الفكرة إلى نضج الممارسة؛ عبر الاستراتيجية، وبناء الأنظمة، وتصميم المبادرات، وقياس الأثر.</p><div className="hero-actions"><a className="primary" href="#services">استكشف مجالات العمل</a><a className="text-link" href="#about">تعرّف على فرح <span>←</span></a></div></div>
      <div className="hero-art" aria-hidden="true"><div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/><div className="sun"><span>أثر</span><small>ينمو</small></div><div className="metric m1"><b>توجُّه</b></div><div className="metric m2"><b>قيادة</b></div><div className="metric m3"><b>أثر</b></div></div>
      <div className="hero-foot"><span>السعودية — جدة</span><span>استراتيجية · تطوير · أثر</span></div>
    </section>
    <section className="statement" id="about"><span className="section-no">01 / الرؤية</span><div><p>لسنا مزوّد خدمة ينتهي دوره عند تسليم الوثيقة.</p><h2>نحن شريكٌ يبني مع المؤسسة <mark>منطقها الداخلي</mark>؛ حتى تقودها أنظمتها، وتنمو بقدراتها، ويُرى أثرها في حياة الناس.</h2></div></section>
    <section className="services" id="services"><div className="section-head"><div><span className="section-no">02 / مجالات العمل</span><h2>خبرة تنموية<br/>متكاملة.</h2></div><p>نبدأ من السؤال الصحيح، ونصمم تدخلاً يناسب واقع المؤسسة ومرحلة نضجها—لا حزمة جاهزة تُكرر على الجميع.</p></div><div className="service-grid">{services.map(s=><article key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><i>↗</i></article>)}</div></section>
    <section className="ims" id="ims">
      <div className="ims-intro">
        <div><span className="section-no light">خدمة متخصصة / IMS 2026</span><h2>نظام إدارة متكامل.<br/><em>جاهز للتطبيق.</em></h2></div>
        <div className="ims-summary"><strong>39</strong><span>وثيقة وأداة احترافية</span><p>حزمة متكاملة تجمع إدارة الجودة والبيئة والصحة والسلامة المهنية ضمن بنية Annex SL واحدة، قابلة للتخصيص بحسب اسم المنظمة وهيكلها وعملياتها.</p></div>
      </div>
      <div className="ims-standards" aria-label="المعايير المشمولة"><span>ISO 9001:2015<small>الجودة</small></span><span>ISO 14001:2026<small>البيئة</small></span><span>ISO 45001:2018<small>الصحة والسلامة المهنية</small></span></div>
      <div className="ims-groups">{imsGroups.map(group=><article key={group.code}><header><span>{group.code}</span><div><h3>{group.title}</h3><p>{group.subtitle}</p></div></header><ul>{group.tools.map(tool=><li key={tool}>{tool}</li>)}</ul></article>)}</div>
      <div className="ims-delivery"><div><span>Word</span><span>Excel</span></div><p><b>ملفات قابلة للتحرير والتكييف</b> — صُممت للاستفادة المباشرة في قطاعات التعدين والرعاية الصحية والهندسة والتصنيع وغيرها.</p><a href="#contact">اطلب تهيئة الحزمة لمنظمتك <i>←</i></a></div>
    </section>
    <section className="approach" id="approach"><div className="approach-intro"><span className="section-no light">03 / منهجية فرح</span><h2>من الواقع،<br/>إلى الأثر.</h2><p>مسار عمل متصل يحفظ العلاقة بين التشخيص والقرار والتنفيذ والنتيجة.</p></div><ol><li><span>أ</span><div><b>نفهم</b><p>نقرأ السياق، ونستمع لأصحاب العلاقة، ونحدد جذور المسألة.</p></div></li><li><span>ب</span><div><b>نصمم</b><p>نبني الحل والنموذج والمؤشرات حول القدرة الحقيقية للمؤسسة.</p></div></li><li><span>ج</span><div><b>نُمكّن</b><p>ننقل المعرفة والأدوات إلى الفريق ليملك التنفيذ لا أن يعتمد علينا.</p></div></li><li><span>د</span><div><b>نقيس</b><p>نتتبع التحسن، ونراجع الفرضيات، ونحوّل التعلم إلى قرار.</p></div></li></ol></section>
    <section className="sectors"><span className="section-no">04 / شركاء الأثر</span><h2>نعمل مع من يرى التنمية<br/>مسؤوليةً مؤسسية.</h2><div className="sector-list">{sectors.map((s,i)=><div key={s}><span>0{i+1}</span><b>{s}</b><i>←</i></div>)}</div></section>
    <section className="knowledge" id="knowledge"><div className="knowledge-card"><span className="section-no light">05 / المعرفة</span><small>قريباً</small><h2>المعرفة التي لا تتحول<br/>إلى ممارسة، عبءٌ أنيق.</h2><p>أدلة، أوراق عمل، ومقاييس نضج تساعد القيادات والفرق على اتخاذ قرارات أكثر وعياً.</p><a href="#contact">اطلب نشرة فرح المعرفية <span>←</span></a></div><aside><span>مبدأ فرح</span><blockquote>«التحول المؤسسي لا يبدأ من كثرة المبادرات؛ بل من وضوح ما يجب أن يتغير.»</blockquote></aside></section>
    <section className="contact" id="contact"><span>لنتحدث عن مؤسستكم</span><h2>لكل أثرٍ كبير<br/>بداية واضحة.</h2><a href="mailto:info@fasdev.org">ابدأ الحوار <i>↗</i></a></section>
    <footer><a className="brand brand-logo footer-logo" href="#top"><img src="/farah-logo.png" alt="فرح التنمية"/></a><p>بيت خبرة سعودي يساعد المؤسسات على بناء قدرةٍ تنموية مستدامة.</p><div><a href="#about">عن فرح</a><a href="#services">الخدمات</a><a href="#knowledge">المعرفة</a></div><small>© 2026 فرح التنمية. جميع الحقوق محفوظة.</small></footer>
  </main>;
}
