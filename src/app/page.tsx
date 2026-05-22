// ============================================
// Landing Page - Dynamic Server Component
// Fetches projects from the database at request time
// ============================================

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch projects:", res.status);
      return [];
    }

    const data = await res.json();
    return data.projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main id="main-content" className="min-h-screen bg-[#080C18] font-cairo">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Projects projects={projects} />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
