'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const products = [
  {
    name: 'IBM Security Access Manager',
    description:
      "Streamline your users' access while securing the use of web, mobile, IoT, and cloud technologies. This platform provides central control over digital identities and access rights.",
  },
  {
    name: 'Identity Governance & Intelligence',
    description:
      'This solution allows organizations to provision, audit, and report on all user access and activity through a comprehensive lifecycle, compliance, and analytics platform.',
  },
  {
    name: 'Privileged Access Management (PAM)',
    description:
      'Safeguard your critical accounts and shared secrets with a simple yet effective solution for Privileged Access Management (PAM), securing system administration.',
  },
  {
    name: 'Network Security Intelligence',
    description:
      'A leading security information and event management (SIEM) platform that provides real-time situational awareness and comprehensive regulatory compliance support.',
  },
];

export const Products = () => {
  return (
    <section className="py-16 bg-section-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            IBM Security Solutions
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            Metrix Engineering Services deploys and integrates several
            cutting-edge security products, including global platforms like IBM,
            as listed below.
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          {/* Left Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/security-illustration.png"
                alt="IBM Security Illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Product List */}
          <div className="space-y-6 flex flex-col">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg hover:shadow-sm transition"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-foreground rounded-full flex items-center justify-center text-white font-bold text-sm">
                  IBM
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 text-foreground">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {product.description}
                  </p>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Centered Button */}
        <div className="flex justify-center pt-6">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            📋 View More
          </Button>
        </div>
      </div>
    </section>
  );
};
