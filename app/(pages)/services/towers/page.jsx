
'use client';

import { motion } from 'framer-motion';import Image from 'next/image';

const Tower = () => {
  const expertise = [
    'Telecom Tower Site Survey and Planning',
    'Tower Foundation Construction and Civil Works',
    'Tower Erection and Structural Installation',
    'Antenna, Mount, and Equipment Installation',
    'Power Systems Installation (DG, Rectifier, Batteries)',
    'Fiber, Feeder, and Cable Tray Installation',
    'Tower Alignment, Safety Compliance, and QA Checks',
    'Preventive and Corrective Tower Maintenance',
    'Structural Strengthening and Tower Modifications',
    'Site Audit, Documentation, and Reporting',
    'Dismantling, Relocation, and Tower Decommissioning',
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
              src="/images/home-image-8.jpg"
              alt="Telecom Equipment Installation"
              fill
              className="object-cover object-[50%_45%]"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center"></div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">
                  <strong>Tower Construction</strong> and <strong>Maintenance</strong>
                </h2>


                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Matrix Engineering Services delivers comprehensive
                      <strong> telecom tower construction and maintenance services</strong>{" "}
                      for mobile network operators and tower companies. We handle complete
                      tower site development including foundation work, tower erection,
                      equipment mounting, and site commissioning in line with industry
                      standards.
                      <br /><br />
                      Our maintenance services ensure long-term tower reliability through
                      regular inspections, structural strengthening, corrective repairs,
                      and safety compliance. With strong field expertise and nationwide
                      coverage, we support smooth network operations and fast rollout of
                      new and existing tower sites across Pakistan.
                    </p>


                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-72  overflow-hidden shadow-lg">
                      <Image
                        src="/images/telecom-installation.jpg"
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
                    Our <strong>Telecom Tower Construction and Maintenance</strong> services include:
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

export default Tower;
