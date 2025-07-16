import './App.css';
import React, { useEffect, useState } from 'react';
// import Page from './pages/dashboard/page';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { LoginPage } from './pages/LoginPages';
// import { RegisterPage } from './pages/RegisterPage';
import LandingPage from './pages/landingpage/LandingPage';

function App() {
  return (
    <>
      {/* <header></header>
      <div>
        <aside>
          <Page />
        </aside>
        <main></main>
      </div>

      <footer></footer> */}
      <LandingPage />
    </>
  );
}

export default App;
