const Location = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header - Updated to match the new style */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent to-primary" />
            <span className="text-sm font-semibold text-primary tracking-widest uppercase">
              Find Us
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our <span className="text-primary">Headquarter</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            Visit our main office or get in touch with us for your telecom infrastructure needs
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-primary/20">
          <iframe
            src="https://www.google.com/maps?q=matrix+service+pvt+ltd+islamabad&z=15&output=embed"
            width="100%"
            height="500"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Matrix Service Pvt Ltd Islamabad Location"
          />
        </div>
      </div>
    </section>
  );
};

export default Location;