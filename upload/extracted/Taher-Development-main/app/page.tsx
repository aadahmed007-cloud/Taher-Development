import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] font-arabic">
      <Navbar />
      <Hero />
      <About />
      <Testimonials />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
