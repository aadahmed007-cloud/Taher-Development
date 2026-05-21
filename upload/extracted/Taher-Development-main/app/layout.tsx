import type {Metadata} from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'شركة طاهر للتطوير العقاري | Taher Development',
  description: 'نبني مستقبلك بثقة ورؤية عصرية. اكتشف أحدث مشاريعنا العقارية الفاخرة.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className={`${cairo.className} bg-[#0F172A] text-slate-200 antialiased selection:bg-[#D4AF37] selection:text-[#0F172A]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
