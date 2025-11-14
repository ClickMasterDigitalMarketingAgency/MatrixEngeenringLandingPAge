const Location = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-block w-12 h-1 bg-primary mb-4"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Our <span className="text-primary">Headquarter</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border-4 border-primary/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.036586886087!2d73.04388631521574!3d33.684421480711834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0xc01c33e0ec44aaaa!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1647856789012!5m2!1sen!2s"
            width="100%"
            height="500"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="MATRIX ENGINEERING SERVICES Headquarter Location - Islamabad, Pakistan"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Location;
