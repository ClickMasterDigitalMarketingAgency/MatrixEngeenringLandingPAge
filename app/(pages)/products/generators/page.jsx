'use client';

import { Building2, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const DiselGenerators = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const expertise = [
    'Supply of New DGs (purchase)',
    'Rental DG Services (short/long-term lease)',
    'Deployment and System Integration',
    'Operation and Maintenance (O&M) Contracts',
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Banner */}
        <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
          <Image
            src="/images/DieselGenerators.png"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40"></div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Backup Diesel <span className="text-primary">Generators</span>{' '}
                for <span className="text-primary">Telecom</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We maintain a reliable and fuel-efficient fleet of Backup
                    Diesel Generators ranging from 10kVA to 50kVA with advanced
                    super soundproof canopy enclosures. We supply high-quality,
                    containerized setups from established brands like Perkins,
                    Jhondeer, Denyo, and Nissan, all backed by comprehensive
                    support from our technical team. This robust offering
                    ensures reliable Telecom Site Energy Solutions for
                    continuous operation.
                  </p>
                  <p>
                    Metrix Engineering Services can provide Diesel Generator
                    systems in a short timeframe across all major Pakistan
                    cities, along with complete installation, operation, and
                    Operations & Maintenance (O&M) services. Our solutions
                    support critical power needs, reducing the risk of downtime
                    at remote or grid-unstable sites.
                  </p>
                </div>

                <div className="flex justify-center">
                  {/* Responsive container: full width on mobile, capped on md+, fixed aspect */}
                  <div className="relative w-full md:max-w-md aspect-[4/3] overflow-hidden rounded-lg">
                    <Image
                      src="/images/Diesel.png"
                      alt="Building Solution"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw" // md:max-w-md ≈ 448px; adjust if your container differs
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Expertise Section */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl mb-8 text-primary">
                  Our <strong>DG Services</strong> are as below:
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DiselGenerators;
