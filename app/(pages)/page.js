"use client";

import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <div className=" bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Hero />
    
{/* 
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Stats />
      </motion.div> */}

    
    
        <About />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Services />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Products />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Clients />
      </motion.div>
      

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Location />
      </motion.div>
    </div>
  );
}
