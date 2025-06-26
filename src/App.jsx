/**

 * Main app entry point:
 * - Wraps all pages with Router
 * - Loads translations using react-i18next
 * - Uses Suspense with a fallback loader during translation load
 * - Shows Navbar, Footer, and AnimatedBackground across all routes
 */

import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

// Components
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Pages
import Home from "./pages/Home";
import MoonCalendar from "./pages/MoonCalendar";
import MoonInfo from "./pages/MoonInfo";
import NotFound from "./pages/NotFound";

// Favicon
import moonLogo from "./assets/cele.png";

export default function App() {
  const { i18n } = useTranslation();

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        {/* Site Favicon */}
        <Helmet>
          <link rel="icon" type="image/png" href={moonLogo} />
        </Helmet>

        {/* Layout wrapper with conditional font per language */}
        <div
          className={`
            flex flex-col
            min-h-screen
            ${i18n.language === "ar" ? "font-ar" : "font-en"}
          `}
        >
          <AnimatedBackground />
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calendar" element={<MoonCalendar />} />
              <Route path="/phases" element={<MoonInfo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </Suspense>
  );
}
