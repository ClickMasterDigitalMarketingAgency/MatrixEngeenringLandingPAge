'use client';
import Image from 'next/image';

const partners = [
  { name: 'IBM', logo: '/images/partners/ibm.png' },

  { name: 'Symantec', logo: '/images/partners/symantec.png' },
  { name: 'Yubico', logo: '/images/partners/yubico.png' },
  { name: 'ActivEdge', logo: '/images/partners/activedge.png' },
  { name: 'JBS', logo: '/images/partners/jbs.png' },
  { name: 'Veritas', logo: '/images/partners/veritas.png' },
  { name: 'STME', logo: '/images/partners/stme.png' },
  { name: 'SBM', logo: '/images/partners/sbm.png' },
  { name: 'CBM', logo: '/images/partners/cbm.png' },
  { name: 'Ostec', logo: '/images/partners/ostec.png' },
];

export const Partners = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 ">
        {/* Section Header */}
        <div className="text-center mb-12 ">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Our Partners
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 transition-transform hover:scale-105"
            >
              <div className="relative w-32 h-16 md:w-40 md:h-20">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 128px, 160px"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
