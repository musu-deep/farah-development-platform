import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "فرح التنمية | تحويل الأفكار لمشاريع مستدامة",
  description: "بيت خبرة سعودي في الاستراتيجية والتطوير المؤسسي وتصميم المبادرات وقياس الأثر.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
