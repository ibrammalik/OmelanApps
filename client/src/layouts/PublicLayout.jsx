import React from "react";
import Navbar from "../pages/landingpage/components/navbar/navbar";
import { Outlet } from "react-router-dom";
import Footer from "../pages/landingpage/components/footer";

export default function PublicLayout() {
  return (
    <>
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
