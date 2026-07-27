import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import Tracks from "@/components/Tracks";
import Agenda from "@/components/Agenda";
import Speakers from "@/components/Speakers";
import Stalls from "@/components/Stalls";
import Sponsors from "@/components/Sponsors";
import Hiring from "@/components/Hiring";
import Volunteers from "@/components/Volunteers";
import Venue from "@/components/Venue";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <div id="timeline">
        <Timeline />
      </div>
      <Tracks />
      <Agenda />
      <Speakers />
      <Stalls />
      <Sponsors />
      <Hiring />
      <Volunteers />
      <Venue />
      <FAQ />
      <Footer />
    </main>
  );
}
