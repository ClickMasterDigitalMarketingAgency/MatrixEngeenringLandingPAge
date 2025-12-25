'use client';

import { motion } from 'framer-motion';

import { Building2, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const BuildingSolutions = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

  const expertise = [
    'Initial Site Survey and assessment',
    'Simulation of various signal distributions and antenna positioning',
    'Detailed planning and system architecture',
    'Provision of required equipment and accessories',
    'Installation and system setup',
    'Integration into the existing network for Indoor Network Optimization',
  ];

  const services = [
    {
      title: 'Indoor Coverage Assessment',
      description:
        'Tailoring a site-specific solution based on building materials, expected traffic load, and ongoing operational considerations.',
    },
    {
      title: 'Indoor Coverage Design and Planning ',
      description:
        'Includes planning and system integration of multiple service providers and different technologies and frequencies; setting the design for future capacity expansion needs such as LTE and other location-based applications.',
    },
    {
      title: 'Site Deployment',
      description:
        'Complete Turnkey Telecom Tower Construction approach for the material supply, installation, and integration of all system components.',
    },
    {
      title: 'Quality Assurance',
      description:
        ' Final sign-off and verification of the installation and its performance against set benchmarks.',
    },
  ];

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
          <section className="relative w-full h-[250px] md:h-[450px] overflow-hidden">
            <Image
              src="/images/hero-section/3.jpg"
              alt="Telecom Equipment Installation"
              fill
              className="object-cover object-[50%_15%]"
              priority
            />
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                  In Building Solution{' '}
                  <span className="text-primary">(IBS)</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Matrix Engineering Services has significant experience in
                      the planning, design, setup, Commissioning checklist, and
                      refinement of comprehensive In-Building Coverage Solutions
                      (IBS), including Distributed Antenna System (DAS)
                      deployments for Indoor Network Optimization and network
                      performance.
                    </p>
                    <p>
                      Telecom Carriers and OEMs facing rapid capacity demands
                      from millions of mobile devices increasingly need reliable
                      indoor signal penetration. Implementing specialized IBS /
                      DAS solutions in high-density areas is crucial for
                      competition. Experience shows that the typical Return on
                      Investment for a dedicated in-building system is achieved
                      quickly, coupled with better service and overall customer
                      satisfaction.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    {/* Responsive container: full width on mobile, capped on md+, fixed aspect */}
                    <div className="relative w-full md:max-w-md aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src="/images/building.png"
                        alt="Building Solution"
                        fill
                        sizes="(min-width: 768px) 28rem, 100vw" // md:max-w-md ≈ 448px; adjust if your container differs
                        className="object-cover object-top"
                        priority
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-muted-foreground mb-12 md:col-span-2">
                    <p>
                      Matrix Engineering Services operates as an end to end
                      telecom services integrator, providing a full portfolio of
                      products for both passive and active system solutions.
                    </p>
                    <p>
                      By applying the most current radio planning tools and
                      high-quality materials, Matrix Engineering Services
                      ensures the most effective, cost-efficient solutions for
                      our customers. Matrix Engineering Services maintains
                      significant experience in the physical deployment of
                      in-building coverage solutions
                    </p>
                  </div>
                </div>

                {/* Expertise Section */}
                <div className="mt-16">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
                    Major areas of{' '}
                    <span className="text-primary">expertise</span> include
                  </h3>
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

                {/* Services Section */}
                <div className="mt-16">
                  <p className="text-muted-foreground mb-8">
                    Matrix Engineering Services holds the necessary knowledge
                    and technical skills to successfully manage the complete
                    IBS/DAS project cycle from planning to execution:
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                      <div
                        key={index}
                        className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                      >
                        <h4 className="font-bold text-lg mb-3 text-foreground">
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {service.description}
                        </p>
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

export default BuildingSolutions;
