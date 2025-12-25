"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Hero from '@/components/landing-pages/home/Hero';
import Stats from '@/components/landing-pages/home/Stats';
import Services from '@/components/landing-pages/home/Services';
import Clients from '@/components/landing-pages/home/Clients';
import Location from '@/components/landing-pages/home/Location';
import Products from '@/components/landing-pages/home/Products';
import About from "@/components/landing-pages/home/About";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function AnimatedSection({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 }); // triggers true/false on scroll

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // ✅ resets when out of view
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="bg-background">
      <AnimatedSection><Hero />
  <About /></AnimatedSection>
      <AnimatedSection><Services /></AnimatedSection>
      <AnimatedSection><Products /></AnimatedSection>
      <AnimatedSection><Clients /></AnimatedSection>
      <AnimatedSection><Location /></AnimatedSection>
    </div>
  );
}
