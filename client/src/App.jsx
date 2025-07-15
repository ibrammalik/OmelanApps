import "./App.css";
import Page from "./pages/dashboard/page";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPages";
import { RegisterPage } from "./pages/RegisterPage";

function App() {
  return (
    <>
      <header></header>
      <div>
        <aside>
          <Page />
        </aside>
        <main></main>
      </div>

      <footer></footer>
    </>
  );
}

export default App;
