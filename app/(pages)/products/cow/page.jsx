'use client';
import Image from 'next/image';

const CellOnWheelTowers = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Banner */}
        <section className="relative w-full h-[250px] md:h-[450px] overflow-hidden">
          <Image
            src="/images/cow-header.jpg"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-center"
            priority
          />
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
                Cell on <span className="text-primary">Wheel Towers </span>(COW)
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Matrix Engineering Services is a leading manufacturer of
                    portable and fixed tower structures. These systems are used
                    in many sectors to provide mobile wireless communications
                    solutions. We build and perform the Commissioning checklist
                    for Cell on Wheel Towers (COW) units and site-specific fixed
                    structures based on customer requirements.
                  </p>
                  <p>
                    We are a specialized fabricator; we operate an internal CAD
                    Design center that can validate wind loading capacity and
                    equipment capacity. All our designs are certified by
                    professional engineers to ensure structural integrity and
                    quality. This commitment allows our Rapid Deployment Cell
                    Towers to perform reliably when needed most.
                  </p>
                  <p>
                    Matrix Engineering Services COWs are well-equipped with the
                    necessary systems for mobile site operation. We use our
                    extensive experience in the Telecom Industry to build
                    systems that are operator-friendly, rigid, and strong enough
                    to meet all the parameters required for a temporary cell
                    site.
                  </p>
                </div>

                <div className="flex justify-center">
                  {/* Responsive container: full width on mobile, capped on md+, fixed aspect */}
                  <div className="relative w-full md:max-w-md aspect-4/3 overflow-hidden rounded-lg">
                    <Image
                      src="/images/cell-tower.jpg"
                      alt="Building Solution"
                      fill
                      sizes="(min-width: 768px) 28rem, 100vw" // md:max-w-md ≈ 448px; adjust if your container differs
                      className="object-cover  object-[50%_75%]"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-4 text-muted-foreground mb-12 md:col-span-2">
                  <p>
                    Matrix Engineering Services mobile cellular site features
                    include: Single-person operation, full integration to allow
                    installation and setup to be completed within 2 hours upon
                    arrival. The articulate mast design, with guy wires,
                    features multiple antenna capacity up to 35-meter height.
                    Our trailer system design does not require ground anchors;
                    the built-in outrigger is sufficient for securing the COW
                    during operation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CellOnWheelTowers;
