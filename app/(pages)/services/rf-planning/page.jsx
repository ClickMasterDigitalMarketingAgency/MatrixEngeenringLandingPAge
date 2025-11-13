import Image from 'next/image';

const RFplaning = () => {
  const expertise = [
    'RF Plan and Design',
    'RF Cell Planning',
    'Capacity Planning and Forecasting',
    'Frequency Planning and Spectrum Allocation',
    'Network Support Services and Field Assistance',
    'Drive Test Campaigns and Data Collection',
    'Traffic and Model Tuning Analysis',
    'Bench Marking against competitor networks',
    'Propagation Models Fine-tuning',
    'KPIs Management and Reporting',
    'Quality of Service (QoS) Testing and Measurements',
  ];

  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Banner */}
        <section className="relative h-[250px] md:h-[300px] overflow-hidden">
          <Image
            src="/images/it tower.jpg"
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
                RF <strong>Planning</strong> and <strong>Optimization</strong>
                Services
              </h2>

              <div className="grid md:grid-cols-2 gap-10 items-start mb-12">
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Metrix Engineering provides a full range of Radio Frequency
                    engineering expertise across all telecom protocols—GSM,
                    GPRS, EDGE, CDMA, WCDMA, and LTE (4G). We are RF Design
                    Consultants Pakistan specializing in the design, testing,
                    and Network Performance Improvement of mobile networks.
                    Metrix Engineering offers a full spectrum of technical
                    capabilities, services, and tools to design and fine-tune
                    wireless networks. Our highly trained team of RF engineers
                    are experts at applying RF design, analysis, and
                    optimization techniques using multi-vendor and
                    multi-technology platforms. Compared to competitors like
                    Talkpool and LCC Pakistan, our local focus provides faster
                    service turnaround.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-full max-w-md h-72  overflow-hidden shadow-lg">
                    <Image
                      src="/images/RFplaning.png"
                      alt="Telecom Tower Installation"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Expertise Section */}
              <div className="mt-12">
                <h2 className="text-2xl text-primary mb-6">
                  Our <strong>RF Planning</strong> and{' '}
                  <strong>Optimization</strong>services includes:
                </h2>
                <div className="space-y-3">
                  {expertise.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RFplaning;
