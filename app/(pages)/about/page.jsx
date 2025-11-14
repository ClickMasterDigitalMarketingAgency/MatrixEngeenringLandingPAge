import { ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const services = [
    'Telecom Equipment Installation & Commissioning',
    'In-Building Solutions (IBS)',
    'Telecom Civil Infrastructure Buildout',
    'Roads & Building Construction',
    'RF Planning & Optimization',
    'Logistics & Warehousing',
    'Telecom Cabinets Manufacturing',
    'Tower Fabrication & Galvanizing',
    'Diesel Generator Rental Services',
  ];

  const values = [
    { title: 'Dependability', icon: '🛡️' },
    { title: 'Collaboration', icon: '🤝' },
    { title: 'Technical Accountability', icon: '⚙️' },
    { title: 'Safety', icon: '✓' },
  ];

  return (
    <main className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
              About{' '}
              <span className="text-primary">Metrix Engineering Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A quality-driven, partnership-focused telecom infrastructure
              company delivering end-to-end telecom services across Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Why Metrix Engineering Services is Different
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are quality driven, partnership focused, and dedicated to
                  client success.{' '}
                  <span className="font-semibold text-foreground">
                    Metrix Engineering Services
                  </span>{' '}
                  is a prominent telecom infrastructure company in Pakistan that
                  delivers full End-to-End Telecom Services across the country.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Founded in{' '}
                  <span className="font-semibold text-foreground">2009</span> by
                  industry veterans, we employ over{' '}
                  <span className="font-semibold text-foreground">
                    300+ people
                  </span>{' '}
                  who work across multiple operating centers. We are built on{' '}
                  <span className="font-semibold text-foreground">
                    15+ years of collective experience
                  </span>{' '}
                  in managing and constructing complex network architecture and
                  providing network lifecycle services in Pakistan.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Metrix Engineering Services helps customers manage their
                  infrastructure more efficiently, offering reliability and
                  helping reduce operational costs. We work directly with
                  Telecom Carriers/Operators and OEMs to deliver comprehensive
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section className="py-16 px-4 border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Vision, Mission & Values
          </h2>

          <div className="space-y-8">
            {/* Vision */}
            <div className="border-l-4 border-primary pl-6 py-2">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the foremost telecom infrastructure company in Pakistan,
                recognized for stability and reliability. We aim to be the most
                trusted technical partner, aiding our Telecom Carriers clients'
                growth through reliable support and the highest quality of
                service.
              </p>
            </div>

            {/* Mission */}
            <div className="border-l-4 border-primary pl-6 py-2">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We strive to provide our clients with focused service, technical
                proficiency, and on-time, budget-aware project completion. We
                maintain strong relationships with our staff and the communities
                where we conduct our Telecom Civil Infrastructure Buildout
                operations.
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Our Values
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                <span className="font-semibold text-foreground">
                  "Dependability, collaboration, technical accountability, and
                  safety."
                </span>{' '}
                These principles guide our team's daily interactions. Our
                policies direct how our staff engages with partners, customers,
                and other OEMs within the industry.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                  >
                    <div className="text-3xl mb-2">{value.icon}</div>
                    <p className="font-semibold text-sm text-foreground">
                      {value.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            Message from Our CEO
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our duties extend beyond providing mobile communications telecom
              services in Pakistan. The telecom infrastructure company sector
              changes quickly, requiring constant readiness to adjust and
              improve.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Metrix Engineering Services, we appreciate this work, as it
              calls for our best efforts in supporting our valuable clients. We
              are committed to remaining a leading service provider, meeting our
              customers' operational needs, and benefiting the communities where
              we operate. We rely on the principles we set for ourselves, our
              team, and our operating procedures, which are in line with our
              corporate strategy. These principles remain constant regardless of
              the different cultures and identities that make up our global
              community.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Metrix Engineering Services has played a key role over the years
              in helping facilitate all related network lifecycle services in
              Pakistan, including Telecom Civil Infrastructure Buildout, Telecom
              Equipment Installation and Commissioning Services, and tower
              fabrication, which is a great point of pride for us.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We understand that operating today's infrastructure can be
              complex, and we will continue to face situations that require
              thoughtful judgment. To address this complexity, our ethical
              guidelines guide us in making the correct choices as individuals
              and as a company. Following these guidelines is the duty of
              everyone at Metrix Engineering Services. By operating with this
              responsibility, we create a positive impact on our industry, the
              communities where we work, and build a company we can all stand
              behind, where corporate accountability provides a distinct
              advantage.
            </p>

            <div className="pt-6 border-t border-border">
              <p className="font-semibold text-foreground">
                Kamal Mumtaz,
                <br />
                <span className="text-primary">
                  CEO, Metrix Engineering Services
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
