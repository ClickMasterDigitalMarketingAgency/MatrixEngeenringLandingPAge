'use client';

import { Building2, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const Construction = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const expertise = [
    ' Earthworks and Material Movement',
    'Civil Works Design for Concrete Highways, expressways, and local roads',
    'Design and setup of Asphalt Pavements, motorways, and Road Construction',
    'Removal and dismantling of current road structures',
    'Road and Infrastructure Construction Services',
    'Footpaths, road markers, and safety systems',
    'Road embankment using suitable soil',
    'RCC Pipe Culverts and Drainage Systems',
    'Stone Pitching and Erosion Control',
    'Concrete Lined Roadside Drains',
  ];

  const services = [
    ' Complete Civil Works for commercial and residential projects',
    'Architectural and Structural Design Work',
    'Ground Excavation',
    'Piling (Structural and Contiguous)',
    'Electromechanical and HVAC Works',
    'Fire Fighting Systems',
    'Elevators and Vertical Transport',
    'Sewerage and Waste Water Systems',
    'Plumbing and Landscaping',
    'Interior Finishing and Fittings',
    'Turnkey Telecom Infrastructure Provider Solutions for structures',
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Banner */}
        <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
          <Image
            src="/images/construction.png"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-center"
            priority
          />
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl  text-center mb-12 text-primary font-medium">
                Infrastructure Construction Services
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Metrix Engineering Services is an established Civil Works
                    Design and engineering company. We approach all Buildings
                    and Roads Construction with both technical reliability and
                    visual consideration, ensuring projects function
                    effectively. We draw upon the varied skills and work history
                    of our team to serve you with high dependability.
                  </p>
                  <p>
                    With years of experience covering a wide range of projects,
                    from Dams to Highways and Buildings, we are prepared for any
                    task. Our team is accustomed to working in diverse
                    conditions and meeting demanding deadlines, allowing Metrix
                    Engineering to be a reliable partner in the field of
                    large-scale Infrastructure Construction Services in
                    Pakistan.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-full md:max-w-md h-72 md:h-80 overflow-hidden rounded-lg">
                    <Image
                      src="/images/buildingAndConstruction.png" // ← ensure exact filename
                      alt="Building Solution"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw"
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-4 text-muted-foreground mb-12 md:col-span-2">
                  <p>
                    Planning a new building or road project? We can help. Our
                    service structure is set up to support you through every
                    stage of the process, from planning to procurement and
                    implementation. We provide focus on core issues early,
                    helping manage the project effectively so you save time and
                    resources.
                  </p>
                </div>
              </div>

              {/* Expertise Section */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl  mb-8 text-primary">
                  Metrix Engineering Services Offers Services in Road &
                  Infrastructure Sector:
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

              {/* Expertise Section */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-3xl  mb-8 text-primary">
                  Metrix Engineering Services Offers Services in Buildings
                  Sector:
                </h3>
                <div className="space-y-3">
                  {services.map((item, index) => (
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

export default Construction;
