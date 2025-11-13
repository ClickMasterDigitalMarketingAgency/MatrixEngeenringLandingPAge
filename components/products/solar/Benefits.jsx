'use client';
import React from 'react';
import {
  DollarSign,
  MapPin,
  Clock,
  Recycle,
  Zap,
  Power,
  Lightbulb,
  Settings,
  Hammer,
} from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const Benefits = () => {
   const items = [
     {
       icon: DollarSign,
       title: 'Reduced Operating Expense',
       desc: 'A PV system delivers power 24/7/365 at a much lower cost than extending the grid or running diesel gensets, reducing LCOE for telecom sites.',
     },
     {
       icon: MapPin,
       title: 'Suitable for Remote Sites',
       desc: 'Off-grid power and battery backup systems engineered for rural and isolated infrastructure locations.',
     },
     {
       icon: Clock,
       title: 'Quick Deployment',
       desc: 'Modular solar power solutions for towers that install fast to meet aggressive rollout timelines.',
     },
     {
       icon: Recycle,
       title: 'Built to Last',
       desc: 'Rust-resistant, field-ready hardware designed to withstand harsh environmental conditions.',
     },
     {
       icon: Zap,
       title: 'Switch to Clean Energy',
       desc: 'Standardized, fire-resistant storage with weather-hardening to maximize system longevity.',
     },
     {
       icon: Power,
       title: 'Commitment to Clean Energy',
       desc: 'Replace combustion engines to meet sustainability targets and climate-impact goals.',
     },
     {
       icon: Lightbulb,
       title: 'Consistent Power Supply',
       desc: 'Integrated solar PV, robust batteries, and generator protection keep power steady during grid failures.',
     },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto px-4">
          {/* Header (matches Products style) */}
          <div className="text-center mb-12">
            <div className="inline-block w-12 h-1 bg-foreground mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Advantages of Our{' '}
              <span className="font-bold text-primary">
                Hybrid Power Solutions
              </span>
            </h2>
          </div>

          {/* Cards grid (matches Products card vibe) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 text-center">
                {/* Bigger Icon Wrapper */}
                <div className="w-24 h-24 mx-auto mb-6  flex items-center justify-center">
                  <Icon className="w-14 h-14 text-primary" />
                </div>

                <h3 className="text-xl font-semibold text-primary mb-2">
                  {title}
                </h3>

                <p className="text-base text-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telecom Towers Section */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-primary mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground ">
              Telecom Site Energy Solutions by {" "}
              <span className="text-primary">Metrix Engineering</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: '/images/telecom-offgrid.jpg',
                alt: 'Off-grid telecom towers',
                title: 'Remote Off-Grid Towers',
                desc: "Expanding rural coverage requires Telecom Tower Construction in areas lacking power grid access. Metrix Engineering's standalone Photovoltaic(PV) System solutions can be rapidly deployed anywhere for a continuous power supply.Compared to operating a Diesel Generator or extending grid infrastructure, our solutions are highly cost- efficient.",
              },
              {
                src: '/images/telecom-grid.jpg',
                alt: 'Unreliable grid at telecom sites',
                title: 'Sites with Unstable Grid',
                desc: 'A large percentage of Telecom Sites in bad-grid locations depend heavily on fuel-fed generators. Switching to a Hybrid Power Solutions for BTS Sites can significantly lower carbon footprint and drastically cut long-term fueling expenses, improving operations.',
              },
              {
                src: '/images/telecom-backup.jpg',
                alt: 'Telecom backup power solution',
                title: 'Backup and Resilience',
                desc: 'Even Telecom Towers with decent grid supply can face outages due to events like natural disasters or system failures. Our systems, combining solar, Battery Backup Systems, and generator protection, provide necessary resilience for Telecom Carriers when continuous power is most needed.',
              },
            ].map(({ src, alt, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center"
              >
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 192px"
                    priority
                  />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                  {title}
                </h3>
                <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Our <span className="text-primary">Turnkey Solar Power</span>{' '}
              Services
            </h2>
          </div>

          <p className=" text-base md:text-[17px] leading-relaxed text-muted-foreground mb-8  mx-auto">
            Metrix Engineering offers Solar Power Solutions for Telecom Towers
            and infrastructure across both Off-Grid and grid-connected
            environments. We specialize in system design, engineering, supply,
            and ongoing support for integrated solar, Battery Backup Systems,
            and generator backup systems. We simplify deployment and reduce
            costs by serving as a single point of responsibility for commercial
            and utility power projects.
          </p>

          <div className="space-y-6">
            {[
              {
                title: 'Solar Power System Project Development & Consulting',
                desc: 'Metrix Engineering guides clients through all stages of the solar system lifecycle. From an Energy Audit and financial analysis, Metrix Engineering clarifies the complex requirements of solar power system for telecom towers for government bodies, Telecom Carriers, and enterprise clients.',
              },
              {
                title:
                  'Solar Power System Structure Fabrication & Installation',
                desc: 'Reduce costs, save time, and avoid issues by partnering with Metrix Engineering for all aspects of physical system assembly and setup. Our solar services make the construction process controlled and predictable. Our team of certified fabricators, engineers, and installers provides the highest quality Turnkey Telecom Infrastructure Provider services for both Off-Grid and grid-connected deployments.',
              },
              {
                title: 'Solar Power System Operations & Maintenance',
                desc: 'Metrix Engineering provides a complete solution for solar power projects. After the successful installation of your system, our Operations & Maintenance (O&M) packages ensure that your Sustainable Energy investment performs reliably. We customize our O&M plans to meet each client’s operational requirements and budget.',
              },
            ].map(({ title, desc }) => (
              <div key={title}>
                <h3 className="text-lg md:text-xl font-bold text-primary mb-2">
                  {title}
                </h3>
                <p className="text-base md:text-[17px] leading-relaxed text-muted-foreground">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* End-to-End Services Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-1 bg-primary mx-auto mb-8" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Metrix Engineering End-to-End {' '}
              <span className="text-primary">Solar Energy</span> Services
            </h2>
          </div>

          <p className="text-center text-base md:text-[17px] leading-relaxed text-muted-foreground mb-12">
            Metrix Engineering makes obtaining clean power and reducing costs
            simple and efficient for our clients. Our end to end telecom
            services approach covers every aspect of your project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Lightbulb,
                title: 'Project Development & Consulting',
                items: [
                  ' Energy Audit',
                  'Feasibility study',
                  'Solar Power Systems design',
                  'Financial viability review',
                ],
              },

              {
                Icon: Settings,
                title: 'Structure Fabrication & Setup',
                items: [
                  'Equipment acquisition',
                  'Mechanical structure and Shelter Foundation',
                  'On-site system setup',
                  'System Commissioning checklist',
                ],
              },
              {
                Icon: Hammer,
                title: 'Support and O&M',
                items: [
                  'Remote system monitoring',
                  'Diagnosis and fault resolution',
                  'Routine maintenance checks',
                  'Performance reporting',
                ],
              },
            ].map(({ Icon, title, items }) => (
              <div
                key={title}
                className="bg-background rounded-lg p-8 text-center shadow-sm"
              >
                {/* Larger Icon Wrapper */}
                <div className="w-24 h-24  flex items-center justify-center mx-auto mb-6 ">
                  <Icon className="w-14 h-14 text-primary" />
                </div>

                <h3 className="text-xl font-bold text-primary mb-6">{title}</h3>

                <ul className="space-y-3 text-base md:text-[17px] leading-relaxed text-foreground">
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;
