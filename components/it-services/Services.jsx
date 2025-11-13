'use client';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const serviceCategories = [
  {
    id: 'enterprise',
    label: 'Enterprise Telecom Support',
    services: [
      { name: 'Secure Password Management', icon: '🔐' },
      { name: 'Identity and Access Management (IAM)', icon: '🔺' },
      { name: 'Database Security & Monitoring', icon: '💾' },
      { name: 'Centralized Authentication', icon: '🔴🟢🔵' },
      { name: 'Single Sign-On (SSO) Deployment', icon: '🔄' },
      { name: 'Access Control & Provisioning', icon: '👤' },
    ],
  },
  {
    id: 'it-service',
    label: 'IT Service Management Solutions',
    services: [
      { name: 'Centralized Knowledge Management', icon: '⚙️' },
      { name: 'Managed Service Request System', icon: '📊' },
      { name: 'Proactive Incident Response', icon: '💬' },
      { name: 'Controlled Change Management', icon: '🔄' },
    ],
  },
  {
    id: 'protection',
    label: 'Protection of Customer & Consumer',
    services: [
      { name: 'Identity & Access Management (IAM) for Clients', icon: '🛡️' },
      { name: 'Multi-Factor Authentication (MFA) for Portals', icon: '🔒' },
      
    ],
  },
  {
    id: 'compliance',
    label: 'Meeting Compliance',
    services: [
      { name: 'SWIFT CSP Compliance', icon: '📋' },
      // { name: 'Audit Management', icon: '📝' },
      // { name: 'Risk Assessment', icon: '⚠️' },
    ],
  },
];

export const Services = () => {
  const [activeTab, setActiveTab] = useState('enterprise');

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Network Management Services & IT Support
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            We offer several specialized Network Management Services and
            technical solutions to our prestigious clients as listed below.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="max-w-5xl mx-auto"
        >
          <TabsList
            className="
      w-full
      flex flex-wrap justify-center gap-3
      mb-12 h-auto
      md:grid md:grid-cols-2
      lg:grid-cols-4
    "
          >
            {serviceCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="
          data-[state=active]:bg-primary
          data-[state=active]:text-white
          py-3 px-4
          text-xs sm:text-sm
          text-center
          break-words
          leading-snug
          rounded-md
          w-full
        "
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services.map((service, index) => (
                  <div key={index} className="text-center">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="font-semibold text-foreground">
                      {service.name}
                    </h3>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
