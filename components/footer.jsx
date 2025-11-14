import Image from 'next/image';

export function Footer() {
  const services = [
    'Telecom Equipment Installation and Commissioning',
    'In Building Solution (IBS)',
    'Telecom Civil Infrastructure Buildout',
    'Buildings and Roads Construction',
    'RF Planning and Optimization',
    'Logistics and Warehousing',
  ];

  const products = [
    'Solar Power Solutions',
    'Telecom Cabinets and Cooling Systems',
    'Galvanized Telecom Towers and Steel Structures',
    'Cell on Wheel Towers (COW)',
    'Diesel Generators',
  ];

  return (
    <footer className="bg-chart-1 text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className=" hover:text-primary transition-colors text-sm">
                    • {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-6">
              Our Products
            </h3>
            <ul className="space-y-3">
              {products.map((product, index) => (
                <li key={index}>
                  <span className=" hover:text-primary transition-colors text-sm">
                    • {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Logo */}
          <div>
            <div className="flex items-center mb-6">
              <Image
                src="/logo.png"
                alt="Industrial steel manufacturing"
                width={64}
                height={64}
                className="w-16 h-auto object-cover drop-shadow-sm"
                priority
              />
              <div>
                <span className="text-2xl font-bold text-primary">
                  MATRIX ENGINEERING SERVICES
                </span>
                <div className="text-xs  -mt-1">PRIVATE LIMITED</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold mb-4">Contact us</h3>
              <p className="text-sm">
                Tel:{' '}
                <a href="tel:+923325220658" className="hover:text-primary">
                  +923325220658
                </a>
              </p>
              <p className="text-sm">
  Email:{' '}
  <a href="mailto:info@matrixes.pk" className="hover:text-primary">
    info@matrixes.pk
  </a>
</p>

              <p className="text-sm">
                Address: 5th floor, Plaza 7, Capital Enclave, Islamabad
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-chart-2 mt-8 pt-8 text-center text-sm text-chart-2">
          <p>
            &copy; {new Date().getFullYear()} MATRIX ENGINEERING Private
            Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
