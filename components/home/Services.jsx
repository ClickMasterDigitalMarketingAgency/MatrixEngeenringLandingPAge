import Link from 'next/link';
import { Card } from '../ui/card';
import {
  Radio,
  Users as UsersIcon,
  Construction,
  Building2,
  Gauge,
  Truck,
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Radio,
      title: 'Telecom Equipment Installation and Commissioning',
      des: 'Reliable Telecom Equipment Installation and Commissioning Services for new network setups and existing upgrades, ensuring smooth operation.',
      url: '/services/telecom-equipment',
    },
    {
      icon: UsersIcon,
      title: 'In Building Solution (IBS)',
      des: 'Delivering strong and consistent mobile Network Coverage Solutions inside buildings for all types of structures and environments.',
      url: '/services/in-building-solution',
    },
    {
      icon: Construction,
      title: 'Telecom Civil Infrastructure Buildout',
      des: 'Complete Telecom Civil Infrastructure Buildout, from site preparation to Turnkey Telecom Tower Construction across all regions.',
      url: '/services/civil-infrastructure',
    },
    {
      icon: Building2,
      title: 'Buildings and Roads Construction',
      des: 'General Buildings and Roads Construction services, supporting broad infrastructure development needs beyond telecom.',
      url: '/services/construction',
    },
    {
      icon: Gauge,
      title: 'RF Planning and Optimization',
      des: 'Precise RF Planning and Optimization Services to fine-tune network signals, leading to improved Network Performance.',
      url: '/services/rf-planning',
    },
    {
      icon: Truck,
      title: 'Logistics and Warehousing',
      des: 'Efficient Logistics and Warehousing for telecom equipment and materials, ensuring timely delivery and secure storage for projects.',
      url: '/services/logistics',
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block w-12 h-1 bg-foreground mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Strategic <span className="font-bold">Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.url}>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow border border-border cursor-pointer">
                <service.icon className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  {service.title}
                </h2>
                <h3 className="text-md text-foreground mt-2">{service.des}</h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
