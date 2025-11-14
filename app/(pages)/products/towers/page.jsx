import Image from 'next/image';

const GalvanizedTelecom = () => {
  const services = [
    'Mechanical Fabrication for Industrial Structures and Shelters',
    'Fabrication of Self-Supporting Towers of any required height',
    'Fabrication of security sheds, Cable Bridges, and Antenna Mounts',
    'Fabrication of various Steel Trusses and Girders',
    'In-house Hot Dip Galvanizing Facility',
    'Fabrication of Cell on Wheel (COW) Towers frames and components',
    'Fabrication of integrated Solar Structures',
  ];

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Banner (full-width, responsive height) */}
        <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
          <Image
            src="/images/elect.png"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-center"
            priority
          />
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Header Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-16">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Galvanized <span className="text-primary">Telecom Towers</span>{' '}
                and <span className="text-primary">Steel</span> Structures
              </h1>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Metrix Engineering Services manufactures numerous value-added
                  Galvanized Telecom Towers and Steel Structures products, such
                  as lattice towers, solar structures, pole towers, and monopole
                  towers. We supply structural components essential for mobile
                  network growth across Pakistan.
                </p>
                <p>
                  We operate a fully equipped, modern Engineering, Tower
                  Fabrication, and Galvanizing facility with a highly skilled
                  and trained workforce. We invest in high-tech machinery to
                  ensure quality for our customers and maintain a conscientious
                  workforce and QC (Quality Control) procedures at every stage
                  of the process. This ensures superior quality and structural
                  reliability.
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {/* Responsive container: full width on mobile, capped on md+, fixed aspect */}
              <div className="relative w-full md:max-w-md aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/images/electe.png"
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
              Following Services are being offered in our{' '}
              <span className="text-primary">Fabrication Unit</span>:
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

export default GalvanizedTelecom;
