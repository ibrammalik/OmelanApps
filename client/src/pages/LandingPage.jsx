import React from 'react';
import Hero from '../components/landing-page/hero';
import Features from '../components/landing-page/features';
import FAQ from '../components/landing-page/faq';
import CTABanner from '../components/landing-page/cta-banner';

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
