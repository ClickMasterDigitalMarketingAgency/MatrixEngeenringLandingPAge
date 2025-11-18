'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Building2, Radio, Network, Zap, Shield } from 'lucide-react';

const SolarEnergyPartner = () => {
  const clients = [
    {
      name: 'LONGI',
      icon: Building2,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-23.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Radio,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-21-1.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Network,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-24.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Zap,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-16.png?fit=3333%2C3333&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-19.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-18-1.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-25.png?fit=3334%2C3334&ssl=1',
    },
    {
      name: 'CLIENTS LOGOS-21',
      icon: Shield,
      logo: 'https://i0.wp.com/highrise.com.pk/wp-content/uploads/2022/09/CLIENTS-LOGOS-23.png?fit=3334%2C3334&ssl=1',
    },
  ];

  return (
    <section className="py-6 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center ">
          <div className="inline-block w-12 h-1 bg-primary mb-4"></div>
          <h2 className="text-3xl md:text-4xl text-foreground">
            Our <strong>Solar Energy</strong> Partners
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

export default SolarEnergyPartner;
