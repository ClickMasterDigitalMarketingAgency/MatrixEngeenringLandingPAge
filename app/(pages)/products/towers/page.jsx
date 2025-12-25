import Image from 'next/image';

const Towers = () => {
  const services = [
    'Fabrication of Self-Supporting Lattice Telecom Towers',
    'Manufacturing of Monopoles and Pole Towers',
    'Rooftop Telecom Tower Structures',
    'Tower Members, Bracing Systems, and Base Plates',
    'Antenna and Microwave Mount Fabrication',
    'Hot Dip Galvanizing of Telecom Towers',
    'Tower Strengthening and Modification Works',
  ];


  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Banner (full-width, responsive height) */}
        <section className="relative w-full h-[250px] md:h-[450px] overflow-hidden">
          <Image
            src="/images/tower-image.jpg"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-[50%_30%]"
            priority
          />
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Header Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
               <span className="text-primary">Telecom Towers</span>{' '}
                
              </h1>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Matrix Engineering Services manufactures numerous value-added
                  Telecom Towers and Steel Structures products, such
                  as lattice towers, solar structures, pole towers, and monopole
                  towers. We supply structural components essential for mobile
                  network growth across Pakistan.
                </p>
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Matrix Engineering Services specializes in the manufacturing of
                    <strong> galvanized telecom towers</strong> designed for reliable and
                    long-term network deployments. Our tower solutions support mobile
                    operators and tower companies with structures engineered for strength,
                    stability, and durability.
                  </p>

                  <p>
                    We produce self-supporting lattice towers, monopoles, pole towers, and
                    rooftop tower structures using high-quality steel and controlled
                    galvanizing processes. Every tower is fabricated with strict quality
                    checks to ensure corrosion resistance, load compliance triggering,
                    and performance under diverse environmental conditions across Pakistan.
                  </p>
                </div>

              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {/* Responsive container: full width on mobile, capped on md+, fixed aspect */}
              <div className="relative w-full md:max-w-md aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/telecom-grid.jpg"
                  alt="Building Solution"
                  fill
                  sizes="(min-width: 768px) 28rem, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8">
              Our <span className="text-primary">Telecom Tower Fabrication</span> services include:
            </h2>


            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-lg">
                    {index + 1}
                  </div>
                  <p className="text-foreground/80 text-base md:text-lg">
                    {service}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Towers;
