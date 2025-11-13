import Image from 'next/image';

const Logistics = () => {
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Banner */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <Image
            src="/images/logisticsAndWarehouse.png"
            alt="Telecom Equipment Installation"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl text-primary text-center mb-12">
                Telecom Logistics and<strong> Warehousing </strong>
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Metrix Engineering has significant experience in this area,
                    offering cost-effective Supply Chain Management and
                    customized logistics solutions based on specific client
                    needs. With an internal fleet that includes small, medium,
                    and large Equipment Transport vehicles, our team is
                    committed to delivering products and materials reliably and
                    efficiently across Pakistan.
                  </p>
                  <p>
                    With secure, state-of-the-art warehousing facilities and
                    distribution solutions, we address customer requirements for
                    secure, in-transit storage along with necessary packing
                    facilities, managed with professional care and fiscal
                    responsibility. We ensure your valuable telecom assets are
                    ready when and where you need them.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-full max-w-md h-72  overflow-hidden shadow-lg">
                    <Image
                      src="/images/Warehouse.png"
                      alt="Telecom Tower Installation"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Logistics;
