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
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const branches = [
    {
      title: 'Islamabad Office',
      desc: '5th floor, Plaza 7, Capital Enclave, Islamabad.',
      email: 'info@matrixes.pk',
      phone: '0332 5220658',
      img: '/images/isl.png',
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Us',
      value: 'info@matrixes.pk',
      href: 'mailto:info@matrixes.pk',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Us',
      value: '0332 5220658',
      href: 'tel:+923325220658',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Visit Us',
      value: 'Islamabad Office',
      href: '#branches',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Enhanced Hero Banner */}
      <section className="relative w-full h-[280px] md:h-[380px] overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Get In <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto px-4"
            >
              Let's start a conversation about your next project
            </motion.p>
          </div>
        </div>
      </section>

     

      <main className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our <span className="text-primary">Branches</span> & Contact
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Visit us at our office or send us a message. Our team is ready
                to assist you with your engineering needs.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Enhanced Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Branches Column */}
            <div className="space-y-8">
              {branches.map((branch, index) => (
                <FadeInWhenVisible key={branch.title} delay={index * 0.2}>
                  <motion.div
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-card border border-border"
                  >
                    <div className="relative w-full h-52 overflow-hidden">
                      <Image
                        src={branch.img}
                        alt={branch.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-6">
                        <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                          {branch.title}
                        </h3>
                      </div>
                    </div>

                    <div className="p-6 md:p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <p className="text-muted-foreground leading-relaxed">
                          {branch.desc}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-primary" />
                          <a
                            href={`mailto:${branch.email}`}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {branch.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-primary" />
                          <a
                            href={`tel:${branch.phone.replace(/\s/g, '')}`}
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            {branch.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeInWhenVisible>
              ))}
            </div>

            {/* Enhanced Contact Form Column */}
            <div className="sticky top-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-2xl shadow-2xl p-8 md:p-10 border border-border"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Send Us a Message
                  </h3>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you soon
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-foreground">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all duration-300"
                        placeholder="Your full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-foreground">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all duration-300"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-foreground">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all duration-300"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-foreground">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-background transition-all duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
