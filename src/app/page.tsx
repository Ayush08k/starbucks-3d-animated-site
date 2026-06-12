"use client";

import { useState, useCallback } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import HeroCanvas from "@/components/HeroCanvas";
import CoffeeStory from "@/components/CoffeeStory";
import MenuGrid from "@/components/MenuGrid";
import DrinkCustomizer from "@/components/DrinkCustomizer";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ToastContainer from "@/components/ToastContainer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useSmoothScroll();

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoadComplete} />

      {isLoaded && (
        <main>
          <Header />
          <HeroCanvas />
          <CoffeeStory />
          <MenuGrid />
          <DrinkCustomizer />
          <GallerySection />
          <Testimonials />
          <AboutSection />
          <Footer />
          <CartDrawer />
          <ToastContainer />
        </main>
      )}
    </>
  );
}

