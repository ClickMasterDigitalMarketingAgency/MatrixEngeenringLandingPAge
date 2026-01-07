'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Moran = () => {
  const expertise = [
    'MORAN Feasibility Assessment and Planning',
    'Multi-Operator Site Sharing Design',
    'Radio Access Network Sharing Configuration',
    'Coordination and Integration Support Between Operators',
    'Multi-Vendor MORAN Deployment Assistance',
    'Coverage and Capacity Validation for Shared Sites',
    'MORAN Performance Optimization and Troubleshooting',
    'Drive Testing and Acceptance Testing for MORAN Networks',
    'KPI Monitoring and Shared Network Reporting',
    'Operational Support for Multi-Operator Environments',
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
              src="/images/home-image-1.jpg"
              alt="MORAN Network Deployment"
              fill
              className="object-cover object-[50%_60%]"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">
                  <strong>MORAN</strong> <span className="font-normal">(Multi-Operator Radio Access Network)</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Matrix Engineering Services provides professional support for
                      <strong> MORAN (Multi-Operator Radio Access Network)</strong> deployments,
                      enabling multiple telecom operators to share the same radio access
                      infrastructure while operating independent core networks.
                      <br /><br />
                      Our MORAN services focus on efficient site sharing, coordinated
                      deployment, and smooth multi-operator integration. We help operators
                      reduce network duplication, optimize infrastructure usage, and ensure
                      consistent coverage and performance across shared sites, backed by
                      strong local field execution and operational support across Pakistan.
                    </p>

                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-72 overflow-hidden shadow-lg">
                      <Image
                        src="/images/connection.jpg"
                        alt="MORAN Site Integration"
                        fill
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Expertise Section */}
                <div className="mt-12">
                  <h2 className="text-2xl text-primary mb-6">
                    Our <strong>MORAN</strong> services include:
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

export default Moran;
