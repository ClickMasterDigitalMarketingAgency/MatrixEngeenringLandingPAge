'use client';

import { Card } from '@/components/ui/card';
import Image from 'next/image';

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
        <Image
          src="/images/contactUs.png"
          alt="Telecom Equipment Installation"
          fill
          className="object-cover object-center"
          priority
        />
      </section>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-12 text-center">
              Our <span className="text-primary">Branches</span>
            </h1>

            {/* Branch Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Islamabad Office',
                  desc: 'Plot No 10, Sanitary Market, I-11/3, Islamabad, Pakistan.',
                  sub: 'Tel: +92 51 4863931-32 Fax: +92 51 4863930',
                  img: '/images/isl.png',
                },
                {
                  title: 'Lahore Office',
                  desc: 'Office #5, DHA Phase 4, Lahore, Pakistan.',
                  sub: 'Tel: +92 42 3894721 Fax: +92 42 3894720',
                  img: '/images/lhr.png',
                },
                {
                  title: 'Karachi Office',
                  desc: 'Suite 3A, Shahrah-e-Faisal, Karachi, Pakistan.',
                  sub: 'Tel: +92 21 3812345 Fax: +92 21 3812344',
                  img: '/images/kch.png',
                },
              ].map(({ title, desc, sub, img }) => (
                <div
                  key={title}
                  className="overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={img}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-lg mb-2 text-primary">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">{desc}</p>
                    <p className="text-sm text-muted-foreground">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Contact Form */}
      <div className="p-8 bg-secondary/30">
        <h2 className="text-3xl font-bold mb-12 text-center text-foreground">
          Contact Us
        </h2>
      
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows={6}
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="p-6 flex justify-end bg-primary text-white py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
