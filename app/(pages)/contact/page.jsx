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

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const branches = [
    {
      title: 'Islamabad Head Office',
      desc: '5th floor, Plaza 7, Capital Enclave, Islamabad.',
      email: 'info@matrixes.pk',
      phone: '0332 5220658',
      img: '/images/isl.png',
      fullInfo: true,
    },
    {
      title: 'Karachi Branch',
      img: '/images/kch.png',
      fullInfo: false,
    },
    {
      title: 'Lahore Branch',
      img: '/images/lhr.png',
      fullInfo: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Section */}
      <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/contactUs.png"
            alt="Contact Matrix Engineering"
            fill
            className="object-cover object-center"
            priority
          />
      
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              Connect with our team across Pakistan
            </motion.p>
          </div>
        </div>
      </section>

      <main className="py-16 px-36 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Our <span className="text-primary">Branches</span> & Contact
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Visit us at our office or send us a message. Our team is ready
                to assist you with your engineering needs.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-16 items-start">
            {/* Branches Column - Takes 1/3 on XL screens */}
            <div className="xl:col-span-1 space-y-8">
              {branches.map((branch, index) => (
                <FadeInWhenVisible key={branch.title} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="w-full group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-card border border-border"
                  >
                    <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                      <Image
                        src={branch.img}
                        alt={branch.title}
                        fill
                        className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
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

            {/* Contact Form Column - Takes 2/3 on XL screens */}
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

                  <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
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
                          className="w-full px-4 py-4 border border-border rounded-xl focus:ring-3 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-base"
                          placeholder="Your full name"
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
                          className="w-full px-4 py-4 border border-border rounded-xl focus:ring-3 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-base"
                          placeholder="your.email@example.com"
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
                        className="w-full px-4 py-4 border border-border rounded-xl focus:ring-3 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 text-base"
                        placeholder="What is this regarding?"
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
                        className="w-full px-4 py-4 border border-border rounded-xl focus:ring-3 focus:ring-primary/50 focus:border-primary bg-background transition-all duration-300 resize-none text-base"
                        placeholder="Tell us about your project or inquiry..."
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full lg:w-2/3 mx-auto px-8 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed text-lg block"
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