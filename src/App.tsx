/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import QuoteCarousel from "./components/QuoteCarousel";
import ExploreGrid from "./components/ExploreGrid";
import Newsletter from "./components/Newsletter";
import ReviewsSection from "./components/ReviewsSection";
import AuthorSection from "./components/AuthorSection";
import Footer from "./components/Footer";
import ComparePage from "./pages/ComparePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "comparar">("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showDownArrow, setShowDownArrow] = useState(true);

  useEffect(() => {
    // Handle browser back/forward
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPage(path === "/comparar" ? "comparar" : "home");
    };

    window.addEventListener("popstate", handlePopState);
    
    // Check initial path
    const path = window.location.pathname;
    setCurrentPage(path === "/comparar" ? "comparar" : "home");

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollHeight > 0 ? (window.scrollY / totalScrollHeight) * 100 : 0;
      setScrollProgress(progress);
      
      // Hide arrow after scrolling 200px
      setShowDownArrow(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (page: "home" | "comparar") => {
    setCurrentPage(page);
    if (page === "comparar") {
      window.history.pushState({}, "", "/comparar");
    } else {
      window.history.pushState({}, "", "/");
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface selection:bg-brand-primary selection:text-brand-surface-lowest">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60]">
        <div
          className="h-full"
          style={{ width: `${scrollProgress}%`, backgroundColor: "#E8621A" }}
        />
      </div>

      <Navigation onNavigate={navigate} currentPage={currentPage} />
      <main>
        {currentPage === "home" ? (
          <>
            <Hero />
            <QuoteCarousel />
            <ExploreGrid />
            <Newsletter />
            <ReviewsSection />
            <AuthorSection />
          </>
        ) : (
          <ComparePage onNavigate={navigate} />
        )}
      </main>
      <Footer />
    </div>
  );
}
