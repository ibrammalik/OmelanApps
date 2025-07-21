import React from 'react';
import Navbar from '../components/landing-page/navbar/navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/landing-page/footer';

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-12 xs:pt-20 sm:pt-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
