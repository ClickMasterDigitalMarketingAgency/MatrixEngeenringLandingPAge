'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { Sun, Battery, Zap, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

export default function page() {
  const features = [
    {
      icon: Sun,
      title: 'Clean Energy',
      description:
        'Harness the power of the sun for sustainable telecom operations',
    },
    {
      icon: Battery,
      title: 'Energy Storage',
      description: 'Advanced battery systems for reliable 24/7 power supply',
    },
    {
      icon: Zap,
      title: 'Cost Effective',
      description: 'Reduce operational costs with renewable energy solutions',
    },
    {
      icon: TrendingUp,
      title: 'High Efficiency',
      description: 'Premium solar panels with maximum energy conversion rates',
    },
  ];
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="min-h-screen">
        <main>
          {/* Hero Section */}
          <section className="relative min-h-[70vh] flex items-center px-4 overflow-hidden">
            {/* Background Image */}
            <Image
              src="/images/solar-energy.jpg" // 👈 change path if needed
              alt="Solar Energy Solutions"
              fill
              priority
              className="object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4">
                  PREMIUM
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  Solar Energy Solutions
                </h1>

                <p className="text-xl text-white/85">
                  Power your telecom infrastructure with cutting-edge solar
                  technology for sustainable and cost-effective operations.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="p-6 text-center hover:shadow-lg transition-shadow"
                  >
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Details Section */}
          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8">
                  Why Choose Solar Power?
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <p>
                    Our premium solar power solutions are specifically designed
                    for telecom infrastructure, providing reliable, clean energy
                    that reduces operational costs and environmental impact.
                  </p>
                  <p>
                    With decades of experience in the telecom industry, we
                    understand the critical nature of uninterrupted power
                    supply. Our solar systems are engineered to deliver
                    consistent performance even in challenging conditions.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      High-efficiency solar panels with extended warranties
                    </li>
                    <li>Intelligent battery management systems</li>
                    <li>Remote monitoring and maintenance capabilities</li>
                    <li>Customized solutions for various site requirements</li>
                    <li>Professional installation and ongoing support</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </motion.div>
  );
}
