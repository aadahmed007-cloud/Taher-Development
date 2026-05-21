import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/session-provider";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "شركة طاهر للتطوير العقاري | Taher Development",
  description:
    "نبني مستقبلك بثقة ورؤية عصرية. اكتشف أحدث مشاريعنا العقارية الفاخرة.",
  keywords: [
    "طاهر للتطوير العقاري",
    "عقارات مصر",
    "فيلات فاخرة",
    "شقق القاهرة الجديدة",
    "استثمار عقاري",
  ],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "شركة طاهر للتطوير العقاري | Taher Development",
    description:
      "نبني مستقبلك بثقة ورؤية عصرية. اكتشف أحدث مشاريعنا العقارية الفاخرة.",
    type: "website",
    locale: "ar_EG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body
        className={`${cairo.className} bg-[#0F172A] text-slate-200 antialiased selection:bg-[#D4AF37] selection:text-[#0F172A]`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
