'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Radio,
  Users as UsersIcon,
  Construction,
  Building2,
  Gauge,
  Zap,
  TowerControl,
  Satellite,
  Wifi,
  ChevronDown,
  ChevronUp,
  Truck,
} from 'lucide-react';

/* ===================== Service Card (matches your ProductCard UI) ===================== */
const ServiceCard = ({ icon: Icon, title, des, imageSrc, url, priority }) => {
  return (
    <Link href={url} className="group block">
      <div className="relative overflow-hidden clip-angled transition-all duration-500 hover:-translate-y-2 aspect-3/3">
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 backdrop-blur-sm">
              <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-card mb-3 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-md text-card leading-relaxed line-clamp-3">
              {des}
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
    </Link>
  );
};

/* ===================== Services Page / Section ===================== */
const Services = () => {
  const [showAll, setShowAll] = useState(false);

  // ✅ Use the SAME images style as your Products cards
  // Replace imageSrc values with your exact images if needed.
  const services = [
    {
      icon: Radio,
      title: 'Telecom Equipment Installation and Commissioning',
      des: 'Reliable Telecom Equipment Installation and Commissioning Services for new network setups and existing upgrades, ensuring smooth operation.',
      url: '/services/telecom-equipment',
      imageSrc: '/images/telecom-installation.jpg',
    },
    {
      icon: Construction,
      title: 'Telecom Civil Infrastructure Buildout',
      des: 'Complete Telecom Civil Infrastructure Buildout, from site preparation to Turnkey Telecom Tower Construction across all regions.',
      url: '/services/civil-infrastructure',
      imageSrc: '/images/Civil Construction.jpg',
    },
    {
      icon: TowerControl,
      title: 'Towers Construction & Maintenance',
      des: 'Professional tower construction, installation, and maintenance services ensuring structural integrity and optimal performance.',
      url: '/services/towers',
      imageSrc: '/images/home-image-8.jpg',
    },
    {
      icon: Satellite,
      title: 'SRAN Solutions',
      des: 'Advanced Single Radio Access Network solutions for efficient and scalable mobile network coverage and capacity.',
      url: '/services/sran',
      imageSrc: '/images/sran.jpg',
    },
    {
      icon: Wifi,
      title: 'MORAN Services',
      des: 'Multi-Operator Radio Access Network solutions enabling infrastructure sharing for multiple telecom operators.',
      url: '/services/moran',
      imageSrc: '/images/home-image-2.png',
    },
    {
      icon: UsersIcon,
      title: 'In Building Solution (IBS)',
      des: 'Delivering strong and consistent mobile Network Coverage Solutions inside buildings for all types of structures and environments.',
      url: '/services/in-building-solution',
      imageSrc: '/images/IBS.jpg',
    },
    {
      icon: Zap,
      title: 'Cell on Wheels (COW)',
      des: 'Rapid deployment of temporary mobile network coverage solutions for events, emergencies, and temporary capacity needs.',
      url: '/services/cow',
      imageSrc: '/images/cow.jpg',
    },
    {
      icon: Gauge,
      title: 'RF Planning and Optimization',
      des: 'Precise RF Planning and Optimization Services to fine-tune network signals, leading to improved Network Performance.',
      url: '/services/rf-planning',
      imageSrc: '/images/home-image-3.png',
    },
    {
      icon: Building2,
      title: 'Buildings and Roads Construction',
      des: 'General Buildings and Roads Construction services, supporting broad infrastructure development needs beyond telecom.',
      url: '/services/construction',
      imageSrc: '/images/construction.jpg',
    },
    {
      icon: Truck,
      title: 'Logistics and Warehousing',
      des: 'Efficient Logistics and Warehousing for telecom equipment and materials, ensuring timely delivery and secure storage for projects.',
      url: '/services/construction',
      imageSrc: '/images/Warehousing.jpg',
    },
  ];

  const servicesToShow = showAll ? services : services.slice(0, 6);

  return (
    <section className="pb-10 md:pb-10 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header (match Products style) */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-linear-to-r from-transparent to-primary" />
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
             We Offer
            </span>
            <div className="w-12 h-0.5 bg-linear-to-l from-transparent to-primary" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="text-foreground">Our </span>
            <span className="text-primary">Services</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive telecom infrastructure solutions built for reliability,
            performance, and scalability.
          </p>
        </div>

        {/* Grid (match Products) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesToShow.map((service, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard {...service} priority={index < 3} />
            </div>
          ))}
        </div>

        {/* See More / Less */}
        <div className="mt-14 text-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-full transition-all duration-300 hover:gap-3 hover:shadow-lg hover:shadow-primary/10 group"
          >
            {showAll ? (
              <>
                Show Less
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </>
            ) : (
              <>
                See More Services
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              </>
            )}
          </button>

          <p className="mt-3 text-sm text-muted-foreground">
            {showAll ? `Showing all ${services.length} services` : `Showing 6 of ${services.length} services`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
