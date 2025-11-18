'use client';

import { motion } from 'framer-motion';

import { Hero } from '@/components/landing-pages/it-services/Hero';
import { Solutions } from '@/components/landing-pages/it-services/Solutions';
import { Services } from '@/components/landing-pages/it-services/Services';
import { Demo } from '@/components/landing-pages/it-services/Demo';
import { Products } from '@/components/landing-pages/it-services/Products';
import { Partners } from '@/components/landing-pages/it-services/Partners';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Solutions />
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
        <Demo />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <Partners />
      </motion.div>
    </div>
  );
};

export default Index;
