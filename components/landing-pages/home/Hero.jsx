'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { Rocket, CheckSquare, Hammer, Users } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ---------------- Counter (runs ONCE) ---------------- */
const Counter = ({ value, duration = 1200 }) => {
  const numeric = useMemo(() => {
    const onlyDigits = String(value).replace(/[^\d]/g, '');
    return onlyDigits ? parseInt(onlyDigits, 10) : 0;
  }, [value]);

  const suffix = useMemo(() => String(value).replace(/[\d,]/g, ''), [value]);

  const [count, setCount] = useState(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    // ✅ prevent re-run (even if component re-renders)
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * numeric));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [numeric, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const slides = [
    { src: '/images/hero-section/4.jpg', alt: 'Telecom Infrastructure 4' },
    { src: '/images/hero-section/1.jpg', alt: 'Telecom Infrastructure' },
    { src: '/images/hero-section/2.jpg', alt: 'Telecom Infrastructure 2' },
    { src: '/images/hero-section/3.jpg', alt: 'Telecom Infrastructure 3' },
  
    { src: '/images/hero-section/5.jpg', alt: 'Telecom Infrastructure 5' },
    { src: '/images/hero-section/6.jpg', alt: 'Telecom Infrastructure 6' },
    { src: '/images/hero-section/7.jpg', alt: 'Telecom Infrastructure 7' },
    { src: '/images/hero-section/8.jpg', alt: 'Telecom Infrastructure 8' },
  ];

  const stats = [
    { icon: Rocket, value: '20+', label: 'Years of Experience' },
    { icon: CheckSquare, value: '50,000+', label: 'Site Activities' },
    { icon: Hammer, value: '500+', label: 'Projects' },
    { icon: Users, value: '700+', label: 'Colleagues' },
  ];

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={90}
        touchRatio={1.5}
        longSwipesRatio={0.15}
        longSwipesMs={250}
        navigation
        className="heroSwiper"
      // ✅ removed onSlideChange (this was replaying the counter)
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[700px]">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
              />

              <div className="absolute inset-0 bg-linear-to-r from-[#13161acc] via-[#151d2966] to-transparent" />

              <div className="absolute inset-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-start">
                  <div className="max-w-lg md:max-w-xl lg:max-w-2xl text-left">
                    <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                      Your One Stop Shop to Plan, Build, Design and Manage your{' '}
                      <span className="text-primary">Telecom Infrastructure</span> with our end to
                      end solutions
                    </h1>
                  </div>
                </div>

                {/* ================= Stats Section ================= */}
                <div className="absolute left-0 right-0 bottom-0 py-3 sm:py-4 md:py-6">
                  <div className="container mx-auto px-4">
                    {/* Desktop */}
                    <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 xl:gap-12">
                      {stats.map((stat, i) => (
                        <div
                          key={i}
                          className="relative flex items-center gap-3 lg:gap-4 px-4 py-3 rounded-xl
                          bg-white/5 backdrop-blur-md
                          shadow-[0_0_30px_rgba(59,130,246,0.25)]
                          hover:shadow-[0_0_45px_rgba(59,130,246,0.45)]
                          transition-all duration-500
                          w-[260px] lg:w-[280px] xl:w-[320px]"
                        >
                          <div className="absolute inset-0 rounded-xl ring-1 ring-primary/30 pointer-events-none" />
                          <stat.icon className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

                          <div className="text-white text-left flex-1">
                            <div className="text-xl lg:text-2xl xl:text-4xl font-bold leading-none">
                              <Counter value={stat.value} />
                            </div>
                            <div className="text-sm lg:text-base text-white/80 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tablet */}
                    <div className="hidden sm:block md:hidden">
                      <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                          <div
                            key={i}
                            className="w-full flex items-center gap-3 p-3 rounded-lg
                            bg-white/5 backdrop-blur
                            shadow-[0_0_20px_rgba(59,130,246,0.25)]
                            ring-1 ring-primary/20"
                          >
                            <stat.icon className="w-6 h-6 text-primary drop-shadow-[0_0_6px_rgba(59,130,246,0.8)] flex-shrink-0" />
                            <div className="text-white text-left flex-1">
                              <div className="text-xl font-bold leading-none">
                                <Counter value={stat.value} />
                              </div>
                              <div className="text-xs sm:text-sm text-white/80 mt-1">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="sm:hidden">
                      <div className="grid grid-cols-2 gap-3">
                        {stats.map((stat, i) => (
                          <div
                            key={i}
                            className="w-full flex items-center gap-2 p-2 rounded-lg
                            bg-white/5 backdrop-blur
                            shadow-[0_0_16px_rgba(59,130,246,0.25)]
                            ring-1 ring-primary/20"
                          >
                            <stat.icon className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(59,130,246,0.8)] flex-shrink-0" />
                            <div className="text-white text-left flex-1">
                              <div className="text-lg font-bold leading-none">
                                <Counter value={stat.value} />
                              </div>
                              <div className="text-xs text-white/80 mt-0.5 line-clamp-1">
                                {stat.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ================= End Stats ================= */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
