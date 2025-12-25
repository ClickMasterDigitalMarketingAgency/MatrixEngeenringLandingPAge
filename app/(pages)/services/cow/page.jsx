'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const COW = () => {
  const expertise = [
    'CoW (Cell on Wheels) Planning and Deployment',
    'Rapid Site Survey and Location Readiness Assessment',
    'Temporary Mast Setup and Antenna Installation',
    'RAN Equipment Installation and Configuration',
    'Power Setup (DG, Batteries, Rectifier) and Load Testing',
    'Microwave / Fiber Backhaul Setup and Alignment',
    'End-to-End Site Commissioning and On-Air Support',
    'Coverage and Capacity Validation for Event / Emergency Sites',
    'Drive Testing and Performance Optimization',
    '24/7 Monitoring and Field Maintenance During Deployment',
    'Dismantling, Demobilization, and Site Restoration',
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
          {/* Hero Banner */}
          <section className="relative h-[250px] md:h-[400px] overflow-hidden">
            <Image
              src="/images/cow-header.jpg"
              alt="Cell on Wheels (CoW) Deployment"
              fill
              className="object-cover object-[50%_5%]"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">
                  <strong>CoW (Cell on Wheels)</strong> Deployment and <strong>Support</strong>
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Matrix Engineering Services provides fast and reliable
                      <strong> CoW (Cell on Wheels)</strong> deployment services for mobile
                      network operators, supporting temporary coverage for events, emergencies,
                      maintenance windows, and network expansion needs.
                      <br /><br />
                      We handle the complete CoW lifecycle from rapid site survey and setup to
                      commissioning, on-air support, and performance checks. Our teams ensure stable
                      power, backhaul connectivity, and optimized radio performance, with strong field
                      execution and quick turnaround across Pakistan.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-72 overflow-hidden shadow-lg">
                      <Image
                        src="/images/cow-img.jpg"
                        alt="Temporary Telecom Site Setup (CoW)"
                        fill
                        className="object-cover object-[50%_35%]"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Expertise Section */}
                <div className="mt-12">
                  <h2 className="text-2xl text-primary mb-6">
                    Our <strong>CoW (Cell on Wheels)</strong> services include:
                  </h2>

                  <div className="space-y-3">
                    {expertise.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </main>
      </div>
    </motion.div>
  );
};

export default COW;
