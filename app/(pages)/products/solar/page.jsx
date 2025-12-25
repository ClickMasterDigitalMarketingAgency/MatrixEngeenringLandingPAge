import React from 'react';
import SolarEnergyPartner from '../../../../components/landing-pages/products/solar/SolarEnergyPartner';
import Image from 'next/image';
import Benefits from '../../../../components/landing-pages/products/solar/Benefits';
export default function page() {
  return (
    <div>
      <div className="min-h-screen">
        <main>
          {/* Hero Banner */}
          <section className="relative w-full h-[250px] md:h-[450px] overflow-hidden">
            <Image
              src="/images/solar.jpg"
              alt="Telecom Equipment Installation"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center "></div>
          </section>

          {/* Content Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
                  Solar Power Solutions for Telecom Towers
                </h2>

                <div className=" ">
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      As the telecom sector grows, mobile network operators,
                      Tower Companies (such as Engro Enfrashare), and internet
                      providers must expand infrastructure into remote areas
                      with weak or absent grid power. The common solution for
                      these Off-Grid telecom sites continues to be Diesel
                      Generator systems, which incur high fuel expenditures and
                      environmental costs. Matrix Engineering Services's
                      integrated micro-grid solutions provide a clean, reliable,
                      and cost-effective alternative for Diesel Generator
                      Replacement within the telecom industry.
                    </p>
                  </div>
                </div>
              </div>
              {/*  */}
              <Benefits />
            </div>
          </section>
        </main>
      </div>

      <SolarEnergyPartner />
    </div>
  );
}
