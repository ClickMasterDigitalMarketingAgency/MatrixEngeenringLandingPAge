import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
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
      <section className="relative min-h-[70vh] flex items-center px-4 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/images/about-us.jpg" // 👈 put your image here
          alt="Matrix Engineering Services"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-white">
              About{' '}
              <span className="text-primary">
                Matrix Engineering Services
              </span>
            </h1>

            <p className="text-xl text-white/85 max-w-2xl leading-relaxed">
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
                Why Matrix Engineering Services is Different
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We are quality driven, partnership focused, and dedicated to
                  client success.{' '}
                  <span className="font-semibold text-foreground">
                    Matrix Engineering Services
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
                  Matrix Engineering Services helps customers manage their
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
              Building a linked world is about more than just setting up poles and wires. The mobile network market is moving at a fast speed. We stay ready to pivot and find new ways to help our clients keep up.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At <strong>Matrix Engineering</strong>, we use this chance to show our value, working hard to give our partners the high-quality results they need. We aim to stay as a top-tier provider that hears what customers want and cares about the places where we work. We take pride in our roots, our crew, and our way of doing business, which matches our company plan based on shared ideals. These ideals stay true regardless of where we are or who we are working with. These values are Trust, Persistence, and Working Together.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              <strong>Matrix Engineering</strong> has done a lot of work over the years to help with all kinds of network tasks; <strong>Civil Works</strong>, <strong>Telecom Equipment Installation</strong>, and <strong>Tower Fabrication</strong>, which are the main things we do well.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We know that life is not always clear, and we will face tough tasks that do not have easy fixes. In these hard times, our company rules and our way of acting help us stay on the right path as a team. Following these rules is a job for every person who works at  <strong>Matrix Engineering</strong>. By doing this, we help our market, our towns, and build a group we are proud to be part of, where doing the right thing is a key way we stand out.
            </p>

            <div className="pt-6 border-t border-border">
              <p className="font-semibold text-foreground">
                Kamal Mumtaz,
                <br />
                <span className="text-primary">
                  Matrix Engineering CEO
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
