import React from 'react';
import Navbar from './components/navbar/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Pricing from './components/pricing';
import FAQ from './components/faq';
import Testimonials from './components/testimonials';
import CTABanner from './components/cta-banner';
import Footer from './components/footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <Features />
        <Pricing />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
