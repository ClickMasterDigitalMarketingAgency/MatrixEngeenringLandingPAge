import { Button } from "@/components/ui/button";
import Image from 'next/image';
export const Hero = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(/images/hero-bg.jpg)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Digital Transformation
            <br />
            and IT Services
          </h1>
          <p className="text-white text-sm md:text-base mb-6 max-w-xl leading-relaxed">
            Managing and securing the essential information assets of your
            organization, the "DATA." Focusing on process management and access,
            incorporating network security, compliance, and governance,
            delivered with network lifecycle services Pakistan that are
            streamlined and secure for your end to end telecom services
            infrastructure.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
          >
            Explore Solutions
          </Button>
        </div>
      </div>
    </section>
  );
};
