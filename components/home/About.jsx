import React from 'react';
import { Card } from '../ui/card';
import { Target, Telescope, HeartHandshake } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'Dependability', icon: '🛡️' },
    { title: 'Collaboration', icon: '🤝' },
    { title: 'Technical Accountability', icon: '⚙️' },
    { title: 'Safety', icon: '✓' },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-block w-12 h-1 bg-foreground mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold">
            Vision, Mission <span className="font-bold">& Values</span>
          </h2>
        </div>

        {/* Vision & Mission - match services grid style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-8xl mx-auto">
          {/* Vision Card */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border border-border">
            <Telescope className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the foremost telecom infrastructure company in Pakistan,
              recognized for stability and reliability. We aim to be the most
              trusted technical partner, aiding our Telecom Carriers clients'
              growth through reliable support and the highest quality of
              service.
            </p>
          </Card>

          {/* Mission Card */}
          <Card className="p-8 text-center hover:shadow-lg transition-shadow border border-border">
            <Target className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide our clients with focused service, technical
              proficiency, and on-time, budget-aware project completion. We
              maintain strong relationships with our staff and the communities
              where we conduct our Telecom Civil Infrastructure Buildout
              operations.
            </p>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mt-12 max-w-8xl mx-auto">
          <Card className="p-8 hover:shadow-lg transition-shadow border border-border">
            <div className="text-center mb-6">
              <HeartHandshake className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Our Values
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">
                  Dependability, collaboration, technical accountability, and
                  safety
                </span>{' '}
                guide our team’s daily interactions. These principles shape how
                our staff engages with partners, customers, and OEMs across the
                telecom industry.
              </p>
            </div>

            {/* Values Cards – match small service-style cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-md transition-shadow border border-border"
                >
                  <div className="text-5xl mb-3">{value.icon}</div>
                  <p className="font-semibold text-lg text-foreground">
                    {value.title}
                  </p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
