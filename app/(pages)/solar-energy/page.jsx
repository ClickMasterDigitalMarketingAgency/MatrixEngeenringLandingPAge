import React from 'react'
import { Sun, Battery, Zap, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function page() {
  const features = [
    {
      icon: Sun,
      title: 'Clean Energy',
      description:
        'Harness the power of the sun for sustainable telecom operations',
    },
    {
      icon: Battery,
      title: 'Energy Storage',
      description: 'Advanced battery systems for reliable 24/7 power supply',
    },
    {
      icon: Zap,
      title: 'Cost Effective',
      description: 'Reduce operational costs with renewable energy solutions',
    },
    {
      icon: TrendingUp,
      title: 'High Efficiency',
      description: 'Premium solar panels with maximum energy conversion rates',
    },
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold mb-4">
                PREMIUM
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Solar Energy Solutions
              </h1>
              <p className="text-xl text-muted-foreground">
                Power your telecom infrastructure with cutting-edge solar
                technology for sustainable and cost-effective operations.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">
                Why Choose Solar Power?
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Our premium solar power solutions are specifically designed
                  for telecom infrastructure, providing reliable, clean energy
                  that reduces operational costs and environmental impact.
                </p>
                <p>
                  With decades of experience in the telecom industry, we
                  understand the critical nature of uninterrupted power supply.
                  Our solar systems are engineered to deliver consistent
                  performance even in challenging conditions.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>High-efficiency solar panels with extended warranties</li>
                  <li>Intelligent battery management systems</li>
                  <li>Remote monitoring and maintenance capabilities</li>
                  <li>Customized solutions for various site requirements</li>
                  <li>Professional installation and ongoing support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
