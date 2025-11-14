'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Cabinets() {
  const Products = [
    {
      name: '80W Heat Exchanger',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/80W-Heat-Exchanger-scaled.jpg?fit=1920%2C2560&ssl=1',
    },
    {
      name: '100W Heat Exchanger',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/100W-Heat-Exchanger-scaled.jpg?fit=1920%2C2560&ssl=1',
    },
    {
      name: '150W Heat Exchanger',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/150W-Heat-Exchanger-scaled.jpg?fit=1920%2C2560&ssl=1',
    },
    {
      name: 'Integrated DC48V Air Cooling Unit',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/3000-4000W-DC-Air-Conditioner-rotated.jpg?fit=1278%2C1706&ssl=1',
    },
    {
      name: 'Outdoor Telecom Cabinets (Single Bay)',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/80W-Heat-Exchanger-scaled.jpg?fit=1920%2C2560&ssl=1',
    },
    {
      name: 'Custom Indoor Telecom Cabinets',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/1000-1500W-DC-Air-Conditioner-rotated.jpg?fit=1278%2C1706&ssl=1',
    },
  ];

  const clients = [
    {
      name: 'Cabinet Production Line - 1',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Cabinet-production-line-1.jpg?fit=1440%2C1080&ssl=1',
    },
    {
      name: 'Cabinet Production Line - 2',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Cabinet-production-line-2.jpg?fit=1440%2C1080&ssl=1',
    },
    {
      name: 'Laser Cutting and Fabrication',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Laser-cutting-1.jpg?fit=1440%2C1080&ssl=1',
    },

    {
      name: 'ACNC Punch Machine',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Air-conditioner-production-line.jpg?fit=1440%2C1080&ssl=1',
    },

    {
      name: 'Powder Coating Booth',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Sheet-metal-1.jpg?fit=1440%2C1080&ssl=1',
    },
    {
      name: 'Assembly and Testing Station',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/Bending-machine-2.jpg?fit=1440%2C1080&ssl=1',
    },
  ];

  // Swiper settings (smooth continuous glide; visuals unchanged)
  const common = {
    modules: [Navigation, Autoplay, FreeMode, Pagination],
    loop: true,
    freeMode: { enabled: true, momentum: false },
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 4500,
    grabCursor: true,
    spaceBetween: 8,
    slidesPerView: 1.2,
    breakpoints: {
      640: { slidesPerView: 2.2, spaceBetween: 8 },
      768: { slidesPerView: 3, spaceBetween: 12 },
      1024: { slidesPerView: 4, spaceBetween: 16 },
      1280: { slidesPerView: 5, spaceBetween: 16 },
    },
    pagination: { clickable: true, dynamicBullets: true },
  };

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[300px] overflow-hidden">
          <Image
            src="/images/CabinetsAndCoolingSystems.png"
            alt="Cabinets Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </section>

        {/* Content */}
        <section className="py-16 bg-background">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Telecom <span className="text-primary">Cabinets </span>and Cooling
              Systems
            </h2>

            <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Metrix Engineering Services, in partnership with a leading
                  global supplier, is a key provider of all types of Telecom
                  Cabinets Pakistan. We manufacture all required types of indoor
                  and outdoor telecom cabinets and temperature control solutions
                  for base station use. We focus on research, design, and sales
                  of network equipment, and our skilled technical team ensures
                  products meet specific needs accurately.
                </p>
                <p>
                  The base station integrated Telecom Cabinets include solutions
                  for the integrated telecom equipment compartment, battery
                  compartment, power supply setup, environment monitoring
                  systems, AC220V compressor cooling units, DC48V air cooling
                  units, and heat exchangers. All system configurations and
                  finished products can be custom built to client
                  specifications.
                </p>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full md:max-w-md aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="/images/Cabinets.png"
                    alt="Cabinet Image"
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>

            {/* products */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl mb-8 text-primary ">
                Our <strong>Products</strong>
              </h3>

              <div className="relative">
                {/* Arrows (same UI) */}
                <button
                  className="products-prev absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center hover:bg-black/60 transition"
                  aria-label="Previous products"
                >
                  ‹
                </button>
                <button
                  className="products-next absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center hover:bg-black/60 transition"
                  aria-label="Next products"
                >
                  ›
                </button>

                <Swiper
                  {...common}
                  navigation={{
                    prevEl: '.products-prev',
                    nextEl: '.products-next',
                  }}
                  className="py-2"
                >
                  {Products.map((client, i) => (
                    <SwiperSlide key={i} className="flex-shrink-0 snap-start">
                      <div className="p-2 rounded-lg ">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-80 w-auto mx-auto object-contain"
                          loading="lazy"
                        />
                        <p className="text-center text-xs text-muted-foreground mt-2">
                          {client.name}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* our Clients */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl mb-8 text-primary ">
                Our <strong>Clients</strong>
              </h3>

              <div className="relative">
                {/* Arrows (same UI) */}
                <button
                  className="clients-prev absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center hover:bg-black/60 transition"
                  aria-label="Previous clients"
                >
                  ‹
                </button>
                <button
                  className="clients-next absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white w-8 h-8 rounded-full hidden md:flex items-center justify-center hover:bg-black/60 transition"
                  aria-label="Next clients"
                >
                  ›
                </button>

                <Swiper
                  {...common}
                  navigation={{
                    prevEl: '.clients-prev',
                    nextEl: '.clients-next',
                  }}
                  className="py-2"
                >
                  {clients.map((client, i) => (
                    <SwiperSlide key={i} className="flex-shrink-0 snap-start">
                      <div className="p-2 rounded-lg ">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-80 w-auto mx-auto object-contain"
                          loading="lazy"
                        />
                        <p className="text-center text-xs text-muted-foreground mt-2">
                          {client.name}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
