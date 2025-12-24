'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Clients = () => {
  const clients = [
    { name: 'NTC', logo: '/images/ntc.png' },
    {
      name: 'zong',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-14.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'ptcl',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-15.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Nayatel',
      logo: 'https://vectorseek.com/wp-content/uploads/2020/12/NAYATEL-logo-vector.png',
    },
    {
      name: 'UFONE',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-12.png?fit=3333%2C3333&ssl=1',
    },
    { name: 'NTC', logo: '/images/ntc.png' },
    {
      name: 'zong',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-14.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'ptcl',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-15.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Nayatel',
      logo: 'https://vectorseek.com/wp-content/uploads/2020/12/NAYATEL-logo-vector.png',
    },
    {
      name: 'UFONE',
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-12.png?fit=3333%2C3333&ssl=1',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-linear-to-b from-secondary/30 via-secondary/20 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Updated to match the new style */}
        <div className="text-center mb-8 md:mb-16 lg:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent to-primary" />
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
              Our Partners
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-primary">Clients</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Trusted by leading telecom companies and organizations across the industry
          </p>
        </div>

        {/* Slider 1 — LEFT ➜ RIGHT */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30
            },
          }}
          loop
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false, 
          }}
          className="overflow-hidden!"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={`top-${index}`}>
              <div className="flex items-center justify-center p-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-50 h-50 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Slider 2 — RIGHT ➜ LEFT */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30
            },
          }}
          loop
          speed={2500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          className="overflow-hidden!"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={`bottom-${index}`}>
              <div className="flex items-center justify-center p-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-50 h-50 object-contain rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Clients;