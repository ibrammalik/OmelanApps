import React from 'react';
import Hero from './components/hero';
import Features from './components/features';
import FAQ from './components/faq';
import CTABanner from './components/cta-banner';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <CTABanner />
    </>
  );
}
