import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-end">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(33, 48, 70, 0.8), rgba(33, 48, 70, 0.4)), url(/images/hero-telecom-tower.jpg)`,
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl ml-auto text-right">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-card mb-6 leading-tight">
            Your One Stop Shop to Plan, Build, Design and Manage your{' '}
            <span className="text-primary">Telecom Infrastructure</span> with
            our end to end solutions
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
