# موقع فرح التنمية

المصدر الكامل لموقع **فرح التنمية**، ويتضمن الموقع المؤسسي وقسم حزمة نظام الإدارة المتكامل:

- ISO 9001:2015
- ISO 14001:2026
- ISO 45001:2018

## المتطلبات

- Node.js 22.13 أو أحدث
- npm

## التشغيل محلياً

افتح Terminal أو PowerShell داخل مجلد المشروع، ثم نفّذ:

```bash
npm install
npm run dev
```

بعد التشغيل افتح العنوان الذي يظهر في Terminal، ويكون عادة:

```text
http://localhost:5173
```

## إنشاء نسخة إنتاج

```bash
npm run build
npm run start
```

## بنية المشروع

- `app/page.tsx`: محتوى الصفحة الرئيسية والأقسام.
- `app/globals.css`: التنسيق الأساسي.
- `app/brand.css`: هوية فرح، الهيرو، الهيدر الزجاجي، وقسم IMS.
- `public/`: الشعار والصورة السينمائية وأصول الموقع.

## الرفع إلى GitHub

```bash
git init
git add .
git commit -m "Initial Farah Development website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

استبدل `USERNAME` و`REPOSITORY` باسم حساب GitHub والمستودع.

---

Farah Development institutional website. Built with React, Vinext, Vite, and TypeScript.
