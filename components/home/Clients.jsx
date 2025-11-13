'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'; 
import { Building2, Radio, Network, Zap, Shield } from 'lucide-react';

const Clients = () => {
  const clients = [
    {
      name: 'NLC',
      icon: Building2,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-13.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'NOKIA',
      icon: Radio,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-14.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Nortel Networks',
      icon: Network,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-15.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Atomic Energy',
      icon: Zap,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-16.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Armed Forces 1',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-17-1.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'Pakistan Armed Forces 2',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-18-1.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'Pakistan Armed Forces 3',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-01.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Armed Forces 4',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-02.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Armed Forces 4',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-03.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'jazz',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-04.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'NHA',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-05.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'NLC',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-06.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Nokia',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-07.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Nortal Networks',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-08.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Atomic Energy',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-09.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'Pakistan Police',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-10.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'SCO',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-11.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'UFONE',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-12.png?fit=3333%2C3333&ssl=1',
    },
  ];

  return (
    <section className="py-6 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center ">
          <div className="inline-block w-12 h-1 bg-primary mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our Satisfied <span className="text-primary">Clients</span>
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="!overflow-hidden"
        >
          {clients.map((client, index) => (
            <SwiperSlide key={index}>
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
