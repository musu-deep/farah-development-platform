import PosterWall from "@/components/PosterWall";

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
      <nav aria-label="التنقل الرئيسي"><a href="#about">عن فرح</a><a href="#services">الخدمات</a><a href="#erp">أنظمة ERP</a><a href="#ims">نظام IMS</a><a href="#approach">منهجيتنا</a><a href="#poster-wall">حائط الأفكار</a><a href="#knowledge">المعرفة</a></nav>
      <a className="nav-cta" href="#contact">ابدأ مشروعاً <span>↗</span></a>
    </header>
    <section className="hero" id="top">
      <div className="hero-copy"><div className="eyebrow"><span/> بيت خبرة سعودي في التنمية المؤسسية</div><h1>تحويل الأفكار<br/><em>لمشاريع مستدامة.</em></h1><p>نرافق المؤسسات من وضوح الفكرة إلى نضج الممارسة؛ عبر الاستراتيجية، وبناء الأنظمة، وتصميم المبادرات، وقياس الأثر.</p><div className="hero-actions"><a className="primary" href="#services">استكشف مجالات العمل</a><a className="text-link" href="#about">تعرّف على فرح <span>←</span></a></div></div>
      <div className="hero-art" aria-hidden="true"><div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/><div className="sun"><span>أثر</span><small>ينمو</small></div><div className="metric m1"><b>توجُّه</b></div><div className="metric m2"><b>قيادة</b></div><div className="metric m3"><b>أثر</b></div></div>
      <div className="hero-foot"><span>السعودية — جدة</span><span>استراتيجية · تطوير · أثر</span></div>
    </section>
    <section className="statement" id="about"><span className="section-no">01 / الرؤية</span><div><p>لسنا مزوّد خدمة ينتهي دوره عند تسليم الوثيقة.</p><h2>نحن شريكٌ يبني مع المؤسسة <mark>منطقها الداخلي</mark>؛ حتى تقودها أنظمتها، وتنمو بقدراتها، ويُرى أثرها في حياة الناس.</h2></div></section>
    <section className="services" id="services"><div className="section-head"><div><span className="section-no">02 / مجالات العمل</span><h2>خبرة تنموية<br/>متكاملة.</h2></div><p>نبدأ من السؤال الصحيح، ونصمم تدخلاً يناسب واقع المؤسسة ومرحلة نضجها—لا حزمة جاهزة تُكرر على الجميع.</p></div><div className="service-grid">{services.map(s=><article key={s.n}><span>{s.n}</span><h3>{s.title}</h3><p>{s.text}</p><i>↗</i></article>)}</div></section>
    <section className="erp" id="erp">
      <div className="erp-head">
        <div><span className="section-no">خدمة متخصصة / ERP</span><h2>من التعقيد إلى<br/><em>السيطرة الكاملة.</em></h2></div>
        <p>نصمم ونطبق أنظمة تخطيط موارد المؤسسات للمصانع الكبيرة وشبكات نقاط البيع الضخمة؛ لتعمل الإنتاج والمخزون والمبيعات والمحاسبة والموارد البشرية ضمن منظومة واحدة مترابطة.</p>
      </div>
      <div className="erp-audience">
        <article><span>01</span><h3>المصانع الكبيرة</h3><p>تخطيط إنتاج دقيق، تتبع المواد الخام، وربط خطوط الإنتاج بالمخزون والمبيعات آلياً.</p></article>
        <article><span>02</span><h3>شبكات نقاط البيع</h3><p>ربط الفروع بالمخزون المركزي والتقارير المالية لحظياً، مع تحديث كل عملية بيع مباشرة.</p></article>
        <article><span>03</span><h3>الشركات سريعة التوسع</h3><p>الانتقال من الأنظمة المنفصلة وإكسل والجرد اليدوي إلى منصة موحّدة قابلة للنمو.</p></article>
      </div>
      <div className="erp-value">
        <div><small>01</small><b>رؤية واحدة موحّدة</b><p>بيانات موحدة بين الإنتاج والمخزون والمبيعات والمحاسبة والموارد البشرية، بلا ازدواج أو تعارض.</p></div>
        <div><small>02</small><b>تخطيط إنتاج دقيق</b><p>معرفة الاحتياج من المواد الخام، نقاط إعادة الطلب، وتوقيت دفعات الإنتاج القادمة.</p></div>
        <div><small>03</small><b>POS مرتبط بالمخزون</b><p>كل عملية بيع في أي فرع تحدّث المخزون والتقارير المالية فوراً.</p></div>
        <div><small>04</small><b>تقارير لحظية</b><p>قرارات مالية وإدارية مبنية على أرقام حقيقية ومحدّثة، لا على تقديرات متأخرة.</p></div>
        <div><small>05</small><b>قابلية للتوسع</b><p>إضافة فروع وخطوط إنتاج ومستخدمين مع نمو الأعمال دون إعادة بناء النظام من الصفر.</p></div>
      </div>
      <div className="erp-method">
        <div className="erp-method-title"><span>منهجية التنفيذ</span><h3>نبدأ من العملية،<br/>لا من البرنامج.</h3></div>
        <ol>
          <li><span>01</span><div><b>دراسة العمليات الحالية</b><p>فهم سير العمل الفعلي بكل قسم قبل أي تنفيذ.</p></div></li>
          <li><span>02</span><div><b>تصميم النظام</b><p>هيكلة تناسب طبيعة المصنع أو شبكة الفروع، لا قالباً عاماً جاهزاً.</p></div></li>
          <li><span>03</span><div><b>التطبيق والربط</b><p>ربط الإنتاج والمخزون والمبيعات ونقاط البيع والمحاسبة في تدفق واحد.</p></div></li>
          <li><span>04</span><div><b>التدريب والتسليم</b><p>تمكين الفريق لضمان انتقال سلس واستمرارية العمليات.</p></div></li>
          <li><span>05</span><div><b>الدعم المستمر</b><p>متابعة وصيانة وتطوير يحافظ على استقرار النظام مع نمو الأعمال.</p></div></li>
        </ol>
      </div>
      <div className="erp-cta"><div><span>جاهز تبدأ؟</span><h3>خلّنا نفهم عملياتك أول.</h3><p>كل مصنع وشبكة نقاط بيع لها واقع مختلف. ندرس احتياجك ونقترح الحل الأنسب لحجمك وميزانيتك.</p></div><a href="https://wa.me/971523034693?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%AD%D8%AC%D8%B2%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%B9%D9%86%20%D8%A3%D9%86%D8%B8%D9%85%D8%A9%20ERP" target="_blank" rel="noopener noreferrer">احجز استشارة أولية مجانية <i>↗</i></a></div>
    </section>
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
    <PosterWall />
    <section className="knowledge" id="knowledge"><div className="knowledge-card"><span className="section-no light">06 / المعرفة</span><small>قريباً</small><h2>المعرفة التي لا تتحول<br/>إلى ممارسة، عبءٌ أنيق.</h2><p>أدلة، أوراق عمل، ومقاييس نضج تساعد القيادات والفرق على اتخاذ قرارات أكثر وعياً.</p><a href="#contact">اطلب نشرة فرح المعرفية <span>←</span></a></div><aside><span>مبدأ فرح</span><blockquote>«التحول المؤسسي لا يبدأ من كثرة المبادرات؛ بل من وضوح ما يجب أن يتغير.»</blockquote></aside></section>
    <section className="contact" id="contact"><span>لنتحدث عن مؤسستكم</span><h2>لكل أثرٍ كبير<br/>بداية واضحة.</h2><a href="mailto:info@fasdev.org">ابدأ الحوار <i>↗</i></a></section>
    <footer><a className="brand brand-logo footer-logo" href="#top"><img src="/farah-logo.png" alt="فرح التنمية"/></a><p>بيت خبرة سعودي يساعد المؤسسات على بناء قدرةٍ تنموية مستدامة.</p><div><a href="#about">عن فرح</a><a href="#services">الخدمات</a><a href="#poster-wall">حائط الأفكار</a><a href="#knowledge">المعرفة</a></div><small>© 2026 فرح التنمية. جميع الحقوق محفوظة.</small></footer>
  </main>;
}
