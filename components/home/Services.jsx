import { Card } from "../ui/card";
import { Radio, Users as UsersIcon, Construction, Building2, Gauge, Truck } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Radio,
      title: "Telecom Equipment Installation and Commissioning",
    },
    {
      icon: UsersIcon,
      title: "In Building Solution (IBS)",
    },
    {
      icon: Construction,
      title: "Telecom Civil Infrastructure Buildout",
    },
    {
      icon: Building2,
      title: "Buildings and Roads Construction",
    },
    {
      icon: Gauge,
      title: "RF Planning and Optimization",
    },
    {
      icon: Truck,
      title: "Logistics and Warehousing",
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
            <Card
              key={index}
              className="p-8 text-center hover:shadow-lg transition-shadow border border-border"
            >
              <service.icon className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
