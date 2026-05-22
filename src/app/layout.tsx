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
  metadataBase: new URL("https://taherdevelopment.com"),
  title: "شركة طاهر للتطوير العقاري | Taher Development",
  description:
    "نبني مستقبلك بثقة ورؤية عصرية. اكتشف أحدث مشاريعنا العقارية الفاخرة.",
  keywords: [
    "طاهر للتطوير العقاري",
    "عقارات مصر",
    "فيلات فاخرة",
    "شقق القاهرة الجديدة",
    "استثمار عقاري",
    "Taher Development",
    "real estate Egypt",
    "luxury villas",
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
    url: "https://taherdevelopment.com",
    siteName: "طاهر للتطوير العقاري",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "طاهر للتطوير العقاري - مشاريع فاخرة في مصر",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "شركة طاهر للتطوير العقاري | Taher Development",
    description:
      "نبني مستقبلك بثقة ورؤية عصرية. اكتشف أحدث مشاريعنا العقارية الفاخرة.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cairo.className} bg-[#080C18] text-slate-200 antialiased`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[9999] focus:bg-[#C8A84E] focus:text-[#080C18] focus:px-4 focus:py-2 focus:rounded-xl focus:font-bold focus:text-sm"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
