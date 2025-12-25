'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { Rocket, CheckSquare, Hammer, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

/* ---------------- Counter (replays when triggerKey changes) ---------------- */
const Counter = ({ value, triggerKey, duration = 2200 }) => {
  const numeric = useMemo(() => {
    const onlyDigits = String(value).replace(/[^\d]/g, '');
    return onlyDigits ? parseInt(onlyDigits, 10) : 0;
  }, [value]);

  const suffix = useMemo(() => String(value).replace(/[\d,]/g, ''), [value]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);

    const start = performance.now();
    let rafId;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.floor(easeOutCubic(t) * numeric));
      if (t < 1) rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [numeric, duration, triggerKey]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ---------------- Intersection Observer Hook ---------------- */
function useStableInView(ref, { threshold = 0.6 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return inView;
}

const Hero = () => {
  const slides = [
   
    { src: '/images/hero-section/1.jpg', alt: 'Telecom Infrastructure' },
    { src: '/images/hero-section/2.jpg', alt: 'Telecom Infrastructure 2' },
    { src: '/images/hero-section/3.jpg', alt: 'Telecom Infrastructure 3' },
    { src: '/images/hero-section/4.jpg', alt: 'Telecom Infrastructure 4' },
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

  // ✅ stats scroll trigger
  const statsRef = useRef(null);
  const statsInView = useStableInView(statsRef, { threshold: 0.6 });
  const [statsRunKey, setStatsRunKey] = useState(0);
  const armedRef = useRef(true);

  useEffect(() => {
    if (statsInView && armedRef.current) {
      setStatsRunKey((k) => k + 1);
      armedRef.current = false;
    }
    if (!statsInView) armedRef.current = true;
  }, [statsInView]);

  // ✅ custom navigation refs (no global css needed)
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={90}
        touchRatio={1.5}
        longSwipesRatio={0.15}
        longSwipesMs={250}
        // 👇 use custom elements
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // 👇 attach refs before init
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="heroSwiper"
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>


     
      {/* ✅ Custom arrows – transparent on mobile */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="
      pointer-events-auto
      absolute left-3 top-1/2 -translate-y-1/2

      w-11 h-11
      sm:w-11 sm:h-11

      rounded-full
      flex items-center justify-center

      text-white

      bg-transparent
      sm:bg-black/35 sm:backdrop-blur-md sm:border sm:border-white/10

      shadow-none sm:shadow-lg
      active:scale-95
      transition
      hover:bg-primary/30
    "
        >
          <ChevronLeft className="w-6 h-6 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]" />
        </button>

        <button
          ref={nextRef}
          aria-label="Next slide"
          className="
      pointer-events-auto
      absolute right-3 top-1/2 -translate-y-1/2

      w-11 h-11
      sm:w-11 sm:h-11

      rounded-full
      flex items-center justify-center

      text-white

      bg-transparent
      sm:bg-black/35 sm:backdrop-blur-md sm:border sm:border-white/10

      shadow-none sm:shadow-lg
      active:scale-95
      transition
      hover:bg-primary/30
    "
        >
          <ChevronRight className="w-6 h-6 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]" />
        </button>
      </div>



      {/* Overlay content (same as your working version) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-start pointer-events-auto">
          <div className="max-w-lg md:max-w-xl lg:max-w-2xl text-left">
            <h1 className="text-xl  sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
              Your One Stop Shop to Plan, Build, Design and Manage your{' '}
              <span className="text-primary">Telecom Infrastructure</span> with our end to end
              solutions
            </h1>
          </div>
        </div>

        {/* ================= Stats Section ================= */}
        <div ref={statsRef} className="absolute left-0 right-0 bottom-0 py-3 sm:py-4 md:py-6">
          <div className="container mx-auto px-4">
            {/* Desktop */}
            <div className="hidden md:flex justify-center items-center gap-6 lg:gap-8 xl:gap-12">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-500 hover:scale-[1.03]"
                >
                  <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl opacity-60 hover:opacity-100 transition" />
                  <stat.icon className="relative z-10 w-7 h-7 xl:w-8 xl:h-8 text-primary drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
                  <div className="relative z-10 text-white">
                    <div className="text-2xl xl:text-4xl font-bold leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                      <Counter value={stat.value} triggerKey={statsRunKey} duration={2200} />
                    </div>
                    <div className="text-sm lg:text-base mt-1 text-white/80 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet */}
            <div className="hidden sm:block md:hidden">
              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, i) => (
                  <div key={i} className="relative flex items-center gap-3 px-3 py-2">
                    <div className="absolute inset-0 bg-primary/10 blur-lg opacity-70" />
                    <stat.icon className="relative z-10 w-6 h-6 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                    <div className="relative z-10 text-white">
                      <div className="text-xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        <Counter value={stat.value} triggerKey={statsRunKey} duration={2200} />
                      </div>
                      <div className="text-sm text-white/80">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="sm:hidden">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="relative flex items-center gap-2 px-2 py-1.5">
                    <div className="absolute inset-0 bg-primary/10 blur-md opacity-70" />
                    <stat.icon className="relative z-10 w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.9)]" />
                    <div className="relative z-10 text-white">
                      <div className="text-lg font-bold drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
                        <Counter value={stat.value} triggerKey={statsRunKey} duration={2200} />
                      </div>
                      <div className="text-xs text-white/80 line-clamp-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* ================= End Stats ================= */}
      </div>
    </section>
  );
};

export default Hero;
