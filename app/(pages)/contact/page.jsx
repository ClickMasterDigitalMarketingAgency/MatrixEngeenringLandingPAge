'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const FadeInWhenVisible = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const branches = [
    {
      title: 'Islamabad Head Office',
      desc: '5th floor, Plaza 7, Capital Enclave, Islamabad.',
      email: 'info@matrixes.pk',
      phone: '0332 5220658',
      img: '/images/isb-image.jpg',
      fullInfo: true,
    },
    {
      title: 'Karachi Branch',
      img: '/images/kch-image.jpg',
      fullInfo: false,
    },
    {
      title: 'Lahore Branch',
      img: '/images/lahore.jpg',
      fullInfo: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/cow-img.jpg"
            alt="Contact Matrix Engineering"
            fill
            className="object-cover  object-[50%_55%]"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="
      text-4xl md:text-6xl lg:text-7xl font-bold mb-6
      text-white
      drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]
    "
            >
              Get In{' '}
              <span
                className="
        text-white
        drop-shadow-[0_0_30px_rgba(59,130,246,0.9)]
      "
              >
                Touch
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="
  text-lg md:text-xl
  text-white
  font-bold
  max-w-2xl mx-auto

  drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]
  drop-shadow-[0_0_20px_rgba(59,130,246,0.7)]
  drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]
"
            >
              Connect with our team across Pakistan
            </motion.p>
          </div>

        </div>
      </section>

      {/* MAIN */}
      <main className="py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28">
        <div className="container mx-auto px-2 sm:px-4">
          <FadeInWhenVisible>
            <div className="max-w-7xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our <span className="text-primary">Branches</span> & Contact
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Visit us at our office or send us a message. Our team is ready
                to assist you with your engineering needs.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* GRID FIXED */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start">
            {/* Branches */}
            <div className="xl:col-span-1 space-y-8">
              {branches.map((branch, index) => (
                <FadeInWhenVisible key={branch.title} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="w-full group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-card border border-border"
                  >
                    <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={branch.img}
                        alt={branch.title}
                        fill
                        className="object-cover  object-[50%_25%] group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl">
                          {branch.title}
                        </h3>
                      </div>
                    </div>

                    {branch.fullInfo ? (
                      <div className="p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                          <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed text-base">
                            {branch.desc}
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                            <a
                              href={`mailto:${branch.email}`}
                              className="text-foreground hover:text-primary transition-colors font-medium text-base break-all"
                            >
                              {branch.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-4">
                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                            <a
                              href={`tel:${branch.phone.replace(/\s/g, '')}`}
                              className="text-foreground hover:text-primary transition-colors font-medium text-base"
                            >
                              {branch.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="text-muted-foreground font-semibold text-lg mb-2">
                          Branch Office
                        </div>
                      </div>
                    )}
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Form */}
            <div className="xl:col-span-2 xl:sticky xl:top-8">
              <FadeInWhenVisible delay={0.4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 border border-border w-full"
                >
                  <div className="text-center mb-10">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      Send Us a Message
                    </h3>
                  </div>

                  <form className="space-y-8 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-foreground">
                          Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-4 border border-border rounded-xl bg-background focus:ring-3 focus:ring-primary/50 focus:border-primary text-base"
                          required
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-base font-semibold text-foreground">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full px-4 py-4 border border-border rounded-xl bg-background focus:ring-3 focus:ring-primary/50 focus:border-primary text-base"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-base font-semibold text-foreground">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        className="w-full px-4 py-4 border border-border rounded-xl bg-background focus:ring-3 focus:ring-primary/50 focus:border-primary text-base"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="block text-base font-semibold text-foreground">
                        Message *
                      </label>
                      <textarea
                        rows={8}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full px-4 py-4 border border-border rounded-xl bg-background focus:ring-3 focus:ring-primary/50 focus:border-primary resize-none text-base"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full lg:w-2/3 mx-auto px-8 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
