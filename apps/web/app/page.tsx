"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import BestsellersSection from "../components/BestsellersSection";
import ValuePropositionSection from "../components/ValuePropositionSection";
import TestimonialsSection from "../components/TestimonialsSection";
import LocationHoursSection from "../components/LocationHoursSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <BestsellersSection />
        <ValuePropositionSection />
        <TestimonialsSection />
        <LocationHoursSection />
      </main>
      <Footer />
    </>
  );
}
