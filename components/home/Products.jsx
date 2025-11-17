import Link from 'next/link';
import { Card } from '../ui/card';
import { Server, RadioTower, Power, Factory, Sun } from 'lucide-react';

const highlight = (text, words) => {
  let result = text;
  words.forEach((w) => {
    const regex = new RegExp(`\\b${w}\\b`, 'gi');
    result = result.replace(regex, `<span class="font-semibold">${w}</span>`);
  });
  return result;
};

const Products = () => {
  const services = [
    {
      icon: Server,
      title: 'Indoor and Outdoor Telecom Cabinets',
      url: '/products/cabinets',
      des: 'Reliable indoor and outdoor telecom cabinets with integrated, precise cooling systems to protect sensitive network equipment in all climates.',
      strong: ['telecom cabinets', 'cooling systems', 'network equipment'],
    },
    {
      icon: RadioTower,
      title: 'Rapid Deployment Cell Towers',
      url: '/products/cow',
      des: 'Quickly deployable Cell on Wheel (COW) Towers for immediate coverage needs during emergencies, special events, or capacity surges.',
      strong: ['Cell on Wheel', 'coverage'],
    },
    {
      icon: Power,
      title: 'Backup Diesel Generators',
      url: '/products/generators',
      des: 'Robust Diesel Generator power systems to ensure reliable site operation and continuous uptime when main utility power fails.',
      strong: ['Diesel Generator', 'site operation', 'uptime'],
    },
    {
      icon: Factory,
      title: 'Galvanized Steel Structures Supply',
      url: '/products/towers',
      des: 'In-house manufacturing of Galvanized Steel Structures and custom Antenna Mounts, guaranteeing high strength and long lifespan for all towers.',
      strong: [
        'Galvanized Steel Structures',
        'Antenna Mounts',
        'high strength',
      ],
    },
    {
      icon: Sun,
      title: 'Solar Power Systems for Telecom',
      url: '/products/solar',
      des: 'Complete Solar Power Systems and Hybrid Power Solutions for BTS Sites, reducing operating expenses through Sustainable Energy generation.',
      strong: [
        'Solar Power Systems',
        'Hybrid Power Solutions',
        'Sustainable Energy',
      ],
    },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block w-12 h-1 bg-foreground mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Our <span className="font-bold">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={index} href={service.url}>
              <Card className="p-8 text-center hover:shadow-lg transition-shadow border border-border cursor-pointer">
                <service.icon className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h2>

                <p
                  className="text-md text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: highlight(service.des, service.strong),
                  }}
                />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
