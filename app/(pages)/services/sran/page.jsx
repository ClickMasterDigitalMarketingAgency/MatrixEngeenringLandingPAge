
'use client';

import { motion } from 'framer-motion';import Image from 'next/image';

const Sran = () => {
  const expertise = [
    'SRAN Network Planning and Design',
    'Multi-Technology SRAN Cell Planning',
    'SRAN Capacity Planning and Traffic Forecasting',
    'Spectrum Sharing and Frequency Configuration for SRAN',
    'SRAN Integration and On-site Network Support',
    'SRAN Drive Testing and Performance Validation',
    'Traffic Analysis and SRAN Parameter Optimization',
    'Network Benchmarking against Competitor SRAN Deployments',
    'Propagation Model Calibration for SRAN Networks',
    'SRAN KPIs Monitoring and Performance Reporting',
    'Quality of Service (QoS) Testing for Unified Radio Networks',
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
              src="/images/home-image-9.jpg"
              alt="Telecom Equipment Installation"
              fill
              className="object-cover object-[50%_35%]"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">
                 <strong>SRAN</strong> {" "}
                  Solutions
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Matrix Engineering Services delivers <strong>Single Radio Access Network</strong> solutions that enable
                      telecom operators to run multiple technologies on a unified radio platform.
                      We support GSM, UMTS, and LTE networks with practical SRAN planning,
                      integration, and optimization focused on real-world deployment conditions.
                      <br /><br />
                      Our team helps operators simplify network architecture, reduce operational
                      overhead, and improve overall radio performance through efficient SRAN
                      modernization and multi-vendor coordination, backed by strong local execution
                      and fast turnaround across Pakistan.
                    </p>

                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-72  overflow-hidden shadow-lg">
                      <Image
                        src="/images/sran.jpg"
                        alt="Telecom Tower Installation"
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
                    Our <strong>SRAN (Single Radio Access Network)</strong> services include:
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

export default Sran;
