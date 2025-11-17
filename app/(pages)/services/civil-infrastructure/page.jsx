
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';


const TelecomInfrastructure = () => {
  const expertise = [
    ' Site Survey and Feasibility Assessment',
    'NOC (No Objection Certificate) and Regulatory Compliance',
    'Soil Investigation and Geological Testing',
    'Telecom Tower Foundation Engineering Design',
    'Civil Works Design and architectural planning',
    'Site Acquisition and Buildout (Land Rights)',
    'Construction & Installation Telecom Tower (Site Construction)',
    'Shelter Foundation and Equipment Pad Structures',
    'Tower Erection and Rigging',
    'Installation of Equipment Shelters',
    'Fencing and Perimeter Security',
    'Electrical and Grounding Works',
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
          <section className="relative h-[250px] md:h-[300px] overflow-hidden">
            <Image
              src="/images/telecomInf.png"
              alt="Telecom Civil Infrastructure Buildout"
              fill
              className="object-cover object-center"
              priority
            />
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl  text-center mb-12">
                  <span className="text-primary">
                    Telecom Civil <strong>Infrastructure Buildout</strong>
                  </span>
                </h2>

                <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Metrix Engineering Services retains highly skilled and
                      trained construction experts, coordinators, and managers
                      prepared to handle complex wireless infrastructure
                      projects. Our dedicated team uses established construction
                      processes and proven techniques to ensure high-quality
                      delivery of complex Telecom Civil Infrastructure Buildout.
                      We operate with commitment to precision and safety in all
                      site development activities.
                    </p>
                    <p>
                      Metrix Engineering Services specializes in complete
                      Turnkey Telecom Tower Construction, from initial Telecom
                      Tower Foundation Engineering to final tower completion and
                      maintenance. Our team of experienced professionals
                      delivers high-quality sites and reliable service,
                      positioning us as a premier Telecom Civil Works Contractor
                      compared to general EPC contractors.
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <div className="relative w-full max-w-md h-72 overflow-hidden shadow-lg">
                      <Image
                        src="/images/infrastructure.png"
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
                  <h2 className="text-2xl font-bold mb-6">
                    Major areas of{' '}
                    <span className="text-primary">expertise</span> include
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

export default TelecomInfrastructure;
