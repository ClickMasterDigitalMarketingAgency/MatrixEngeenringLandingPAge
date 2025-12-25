'use client';

import Image from 'next/image';
import { Server, RadioTower, Power, Factory, Sun, TowerControl, Truck } from 'lucide-react';

const ProductCard = ({ icon: Icon, title, description, imageSrc, url, priority }) => {
  return (
    <a href={url} className="group block">
      {/* ✅ Give the card its own height using aspect */}
      <div className="relative overflow-hidden clip-angled card-hover transition-all duration-500 hover:-translate-y-2 aspect-3/3">
        {/* Background Image */}
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          quality={95}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-accent-foreground/50" />

        {/* Content */}
        <div className="relative z-10 p-6 pt-16 pb-8 h-full flex flex-col">
          {/* Icon */}
          <div className="mb-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10  backdrop-blur-sm">
              <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-card mb-3 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-md text-card leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Hover Arrow */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-primary text-sm font-medium flex items-center gap-2">
              Learn More
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/20 transform -rotate-45 translate-x-[-50%] translate-y-[-50%]" />
        </div>
      </div>
    </a>
  );
};

const products = [
  {
    icon: Server,
    title: 'Indoor & Outdoor Telecom Cabinets',
    url: '/products/cabinets',
    description:
      'Reliable indoor and outdoor telecom cabinets with integrated, precise cooling systems to protect sensitive network equipment.',
    imageSrc: '/images/telecom-cabinets.jpg',
  },
  {
    icon: RadioTower,
    title: 'Cell on Wheel (COW)',
    url: '/products/cow',
    description:
      'Quickly deployable Cell on Wheel (COW) Towers for immediate coverage during emergencies and special events.',
    imageSrc: '/images/cell-tower.jpg',
  },
  {
    icon: Power,
    title: 'Backup Diesel Generators',
    url: '/products/generators',
    description:
      'Robust diesel generator power systems ensuring reliable site operation and continuous uptime.',
    imageSrc: '/images/diesel-generator.jpg',
  },
  {
    icon: Factory,
    title: 'Galvanized Steel Structures',
    url: '/products/galvanized-towers',
    description:
      'In-house manufacturing of galvanized steel structures and custom antenna mounts with high strength.',
    imageSrc: '/images/steel-structures.jpg',
  },
  {
    icon: Sun,
    title: 'Solar Power Systems',
    url: '/products/solar',
    description:
      'Complete solar power systems and hybrid solutions for BTS sites, reducing costs through sustainable energy.',
    imageSrc: '/images/solar-power.jpg',
  },
  {
    icon: TowerControl,
    title: 'Tower',
    url: '/products/towers',
    description:
      'High-strength galvanized steel towers for reliable network infrastructure, designed for durability and optimal signal transmission in all weather conditions.',
    imageSrc: '/images/telecom-grid.jpg',
  },

];

const Products = () => {
  return (
    <div className="min-h-screen bg-card mt-10 md:mt-10">
      {/* Hero Section */}
      <section className="relative  overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-primary" />
              <span className="text-sm font-semibold text-primary tracking-widest uppercase">
               Our Products
              </span>
              <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-primary" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className='text-foreground'> We </span><span className="text-primary">Provide</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              High-quality telecom infrastructure products designed for reliability,
              durability, and optimal performance in any environment.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className=" pb-20 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard {...product} priority={index < 3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      {/* <section className="py-16 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
          <p className="text-muted-foreground mb-6">
            Need a custom solution for your telecom infrastructure?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            Contact Us
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default Products;
