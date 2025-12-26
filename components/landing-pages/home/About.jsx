import React from 'react';
import { Card } from '../../ui/card';
import { Target, Telescope, HeartHandshake, Shield, Users, Wrench, CheckCircle, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Dependability',
      icon: Shield,
      description: 'Reliable service delivery and consistent performance',
      gradient: 'from-blue-500/10 to-indigo-500/5'
    },
    {
      title: 'Collaboration',
      icon: Users,
      description: 'Partnering for mutual success and shared goals',
      gradient: 'from-green-500/10 to-emerald-500/5'
    },
    {
      title: 'Technical Accountability',
      icon: Wrench,
      description: 'Expertise backed by responsibility and precision',
      gradient: 'from-orange-500/10 to-amber-500/5'
    },
    {
      title: 'Safety',
      icon: CheckCircle,
      description: 'Highest safety standards in all operations',
      gradient: 'from-red-500/10 to-rose-500/5'
    },
    {
      title: 'Innovation',
      icon: Sparkles,
      description: 'Embracing cutting-edge telecom solutions',
      gradient: 'from-purple-500/10 to-pink-500/5'
    },
    {
      title: 'Excellence',
      icon: Target,
      description: 'Uncompromising quality in every project',
      gradient: 'from-cyan-500/10 to-blue-500/5'
    },
  ];

  return (
    <section className="pb-20 pt-15 md:pb-28 pt-15 bg-linear-to-b from-background via-background/98 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
              About Us
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Vision, Mission <span className="text-primary">&</span> Values
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            The guiding principles that define our commitment to excellence in telecom infrastructure
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/15 to-transparent rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-700"></div>
            <Card className="relative p-6 sm:p-8 md:p-10 bg-card/50 backdrop-blur-sm border border-border/30 hover: transition-all duration-500 hover:shadow-xl h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="relative mb-5 md:mb-6">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative">
                    
                    <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"></div>
                    <Telescope className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">Our Vision</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-primary/20 to-primary/50 mb-5 md:mb-6 rounded-full" />
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2">
                  To be the foremost telecom infrastructure company in Pakistan, recognized for
                  <span className="font-semibold text-foreground"> stability and reliability</span>.
                  We aim to be the most trusted technical partner, aiding our Telecom Carriers'
                  growth through reliable support and the
                  <span className="font-semibold text-foreground"> highest quality of service</span>.
                </p>
              </div>
            </Card>
          </div>

          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-l from-primary/30 via-primary/15 to-transparent rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-700"></div>
            <Card className="relative p-6 sm:p-8 md:p-10 bg-card/50 backdrop-blur-sm border border-border/30 hover: transition-all duration-500 hover:shadow-xl h-full">
              <div className="flex flex-col items-center text-center h-full">
                <div className="relative mb-5 md:mb-6">
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"></div>
                    <Target className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 md:mb-4">Our Mission</h3>
                <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-primary/20 to-primary/50 mb-5 md:mb-6 rounded-full" />
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-2">
                  We strive to provide our clients with
                  <span className="font-semibold text-foreground"> focused service, technical proficiency,</span>
                  and on-time, budget-aware project completion. We maintain
                  <span className="font-semibold text-foreground"> strong relationships</span> with our
                  staff and the communities where we conduct our Telecom Civil Infrastructure Buildout operations.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Values Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="relative inline-block mb-4">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl"></div>
            <HeartHandshake className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto text-primary" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 md:mb-4">Our Core Values</h3>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4 mb-8">
            Dependability, collaboration, technical accountability, and safety guide our team's daily
            interactions and shape how we engage with partners across the telecom industry.
          </p>
        </div>

        {/* Values Grid - 3 columns on large screens, 2 on medium, 1 on small */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
              <Card className="relative p-5 sm:p-6 md:p-7 bg-card/60 backdrop-blur-sm border border-border/30 hover:hover:shadow-lg transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="relative mb-4 md:mb-5">
                    <div className="absolute -inset-3 bg-primary/15 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className={`relative p-3 md:p-4 rounded-2xl bg-gradient-to-br ${value.gradient} group-hover:scale-110 transition-all duration-300`}>
                      <value.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-primary" />
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2 md:mb-3">{value.title}</h4>
                  <p className="text-md sm:text-md text-muted-foreground leading-relaxed px-2">
                    {value.description}
                  </p>
                  <div className="mt-5 md:mt-6 w-10 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent group-hover:w-16 group-hover:via-primary/50 transition-all duration-300" />
                </div>
              </Card>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
}