import React from 'react';
import Hero from '../components/landing-page/hero';
import Features from '../components/landing-page/features';
import FAQ from '../components/landing-page/faq';
import CTABanner from '../components/landing-page/cta-banner';
import CaregiverListSection from '@/components/landing-page/caregiver-list';
import { getAllCaregivers } from '@/utils/local-data';
import useInitialData from '@/hooks/useInitialData';

export default function LandingPage() {
  const { initializing, data: caregivers } = useInitialData(() => getAllCaregivers());

  return (
    <>
      <Hero />
      <Features />
      <CaregiverListSection initializing={initializing} caregivers={caregivers} />
      <FAQ />
      <CTABanner />
    </>
  );
}
