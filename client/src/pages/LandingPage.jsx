import React, { useEffect, useState } from "react";
import Hero from "../components/landing-page/hero";
import Features from "../components/landing-page/features";
import FAQ from "../components/landing-page/faq";
import CTABanner from "../components/landing-page/cta-banner";
import CaregiverListSection from "@/components/landing-page/caregiver-list";
import { getAllCaregivers } from "@/utils/local-data";
import useInitialData from "@/hooks/useInitialData";
import { fetchAllCaregivers } from "@/utils/api";

export default function LandingPage() {
  const [DBcaregivers, setCaregivers] = useState([]);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    fetchAllCaregivers().then(({ data }) => {
      if (data) setCaregivers(data);
      setInitializing(false);
    });
  }, []);
  // const { initializing, data: caregivers } = useInitialData(() =>
  //   getAllCaregivers()
  // );

  return (
    <>
      <Hero />
      <Features />
      <CaregiverListSection
        initializing={initializing}
        caregivers={DBcaregivers}
      />
      <FAQ />
      <CTABanner />
    </>
  );
}
