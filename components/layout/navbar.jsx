'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
const [productsOpen, setProductsOpen] = useState(false);

  const navbarRef = useRef(null);

  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const servicesItems = [
    {
      label: 'IT Services',
      path: '/services/it-services',
    },
    {
      label: '  Solar Energy',
      path: '/services/solar-energy',
    },

    { label: 'RF Planning and Optimization', path: '/services/rf-planning' },
    {
      label: 'Buildings and Roads Construction',
      path: '/services/construction',
    },
    {
      label: 'In Building Solution (IBS)',
      path: '/services/in-building-solution',
    },
    {
      label: 'Telecom Civil Infrastructure',
      path: '/services/civil-infrastructure',
    },
    { label: 'Logistics and Warehousing', path: '/services/logistics' },
    {
      label: 'Telecom Equipment Installation and Commissioning',
      path: '/services/telecom-equipment',
    },
  ];
 
  const productsItems = [
    { label: 'Galvanized Towers', path: '/products/towers' },
    { label: 'Diesel Generators', path: '/products/generators' },
    { label: 'Solar Power Solutions', path: '/products/solar' },
    { label: 'Cell on Wheel Towers (COW)', path: '/products/cow' },
    { label: 'Telecom Cabinets', path: '/products/cabinets' },
  ];

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileProductsOpen(false);
  };

  // Animation variants
  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.6,
      },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  const dropdownItemVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const staggerVariants = {
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.nav
      ref={navbarRef}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Link href="/" className="flex items-center flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <Image
                  src="/logo.png"
                  alt="Industrial steel manufacturing"
                  width={64}
                  height={64}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover drop-shadow-sm"
                  priority
                />
              </motion.div>
              <div className="ml-2 sm:ml-3 leading-tight">
                {/* Single line for desktop, two lines for mobile */}
                <div className="hidden lg:block">
                  <span className="text-xl font-bold text-primary">
                    MATRIX ENGINEERING SERVICES
                  </span>
                  <div className="text-xs -mt-1 text-foreground">
                    PRIVATE LIMITED
                  </div>
                </div>
                {/* Two lines for mobile and tablet */}
                <div className="lg:hidden">
                  <span className="text-lg font-bold text-primary block">
                    MATRIX ENGINEERING
                  </span>
                  <span className="text-lg font-bold text-primary block -mt-1">
                    SERVICES
                  </span>
                  <div className="text-xs -mt-1 text-foreground">
                    PRIVATE LIMITED
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/">
                <Button
                  variant="ghost"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive('/')
                      ? 'text-primary bg-primary/10 shadow-inner'
                      : 'text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg'
                  }`}
                >
                  HOME
                </Button>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/about">
                <Button
                  variant="ghost"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive('/about')
                      ? 'text-primary bg-primary/10 shadow-inner'
                      : 'text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg'
                  }`}
                >
                  ABOUT US
                </Button>
              </Link>
            </motion.div>

            

   {/* SERVICES */}
<DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300"
    >
      SERVICES
      <ChevronDown className="ml-1 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-md border-border z-50 shadow-xl">
    <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
    {servicesItems.map((item) => (
      <DropdownMenuItem key={item.path} asChild>
        <Link
          href={item.path}
          onClick={() => setServicesOpen(false)} // Close dropdown on click
          className={`w-full cursor-pointer px-3 py-2 rounded-md text-sm transition-all duration-300 ${
            isActive(item.path)
              ? 'text-primary bg-primary/10 shadow-inner'
              : 'hover:bg-primary hover:text-white hover:shadow-lg'
          }`}
        >
          {item.label}
        </Link>
      </DropdownMenuItem>
    ))}</motion.div>
  </DropdownMenuContent>
</DropdownMenu>

{/* PRODUCTS */}
<DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300"
    >
      PRODUCTS
      <ChevronDown className="ml-1 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="w-64 bg-background/95 backdrop-blur-md border-border z-50 shadow-xl">
    <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
    {productsItems.map((item) => (
      <DropdownMenuItem key={item.path} asChild>
        <Link
          href={item.path}
          onClick={() => setProductsOpen(false)} // Close dropdown on click
          className={`w-full cursor-pointer px-3 py-2 rounded-md text-sm transition-all duration-300 ${
            isActive(item.path)
              ? 'text-primary bg-primary/10 shadow-inner'
              : 'hover:bg-primary hover:text-white hover:shadow-lg'
          }`}
        >
          {item.label}
        </Link>
      </DropdownMenuItem>
    ))}</motion.div>
  </DropdownMenuContent>
</DropdownMenu>

           
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive('/contact')
                      ? 'text-primary bg-primary/10 shadow-inner'
                      : 'text-gray-800 hover:bg-primary hover:text-white hover:shadow-lg'
                  }`}
                >
                  CONTACT US
                </Button>
              </Link>
            </motion.div>

           
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden rounded-md p-2 transition text-gray-800 hover:bg-primary hover:text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border py-2 space-y-1 z-50 max-h-[80vh] overflow-y-auto shadow-xl"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <motion.div variants={staggerVariants}>
                {/* HOME */}
                <motion.div variants={dropdownItemVariants}>
                  <Link href="/" onClick={handleMobileLinkClick}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                        isActive('/')
                          ? 'text-primary bg-primary/10 shadow-inner'
                          : 'text-gray-800 hover:bg-primary hover:text-white'
                      }`}
                    >
                      HOME
                    </Button>
                  </Link>
                </motion.div>

                {/* ABOUT US */}
                <motion.div variants={dropdownItemVariants}>
                  <Link href="/about" onClick={handleMobileLinkClick}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                        isActive('/about')
                          ? 'text-primary bg-primary/10 shadow-inner'
                          : 'text-gray-800 hover:bg-primary hover:text-white'
                      }`}
                    >
                      ABOUT US
                    </Button>
                  </Link>
                </motion.div>


                {/* SERVICES */}
                <motion.div
                  variants={dropdownItemVariants}
                  className="space-y-1"
                >
                  <button
                    className="flex w-full items-center justify-between text-left px-4 py-3 rounded-none text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                  >
                    <span>SERVICES</span>
                    <motion.div
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mobileServicesOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        className="space-y-1 bg-gray-50/50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={staggerVariants}
                      >
                        {servicesItems.map((item, index) => (
                          <motion.div
                            key={item.path}
                            variants={dropdownItemVariants}
                          >
                            <Link
                              href={item.path}
                              onClick={handleMobileLinkClick}
                            >
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-6 py-2 rounded-none text-xs font-medium transition-all duration-300 ${
                                  isActive(item.path)
                                    ? 'text-primary bg-primary/10 shadow-inner'
                                    : 'text-gray-800 hover:bg-primary hover:text-white'
                                }`}
                              >
                                {item.label}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* PRODUCTS */}
                <motion.div
                  variants={dropdownItemVariants}
                  className="space-y-1"
                >
                  <button
                    className="flex w-full items-center justify-between text-left px-4 py-3 rounded-none text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => setMobileProductsOpen((prev) => !prev)}
                  >
                    <span>PRODUCTS</span>
                    <motion.div
                      animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mobileProductsOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        className="space-y-1 bg-gray-50/50"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={staggerVariants}
                      >
                        {productsItems.map((item, index) => (
                          <motion.div
                            key={item.path}
                            variants={dropdownItemVariants}
                          >
                            <Link
                              href={item.path}
                              onClick={handleMobileLinkClick}
                            >
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-6 py-2 rounded-none text-xs font-medium transition-all duration-300 ${
                                  isActive(item.path)
                                    ? 'text-primary bg-primary/10 shadow-inner'
                                    : 'text-gray-800 hover:bg-primary hover:text-white'
                                }`}
                              >
                                {item.label}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

             

                {/* CONTACT US */}
                <motion.div variants={dropdownItemVariants}>
                  <Link href="/contact" onClick={handleMobileLinkClick}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                        isActive('/contact')
                          ? 'text-primary bg-primary/10 shadow-inner'
                          : 'text-gray-800 hover:bg-primary hover:text-white'
                      }`}
                    >
                      CONTACT US
                    </Button>
                  </Link>
                </motion.div>

                {/* LOGIN */}
                <motion.div variants={dropdownItemVariants}>
                  <Link href="/login" onClick={handleMobileLinkClick}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-all duration-300 ${
                        isActive('/login')
                          ? 'text-primary bg-primary/10 shadow-inner'
                          : 'text-gray-800 hover:bg-primary hover:text-white'
                      }`}
                    >
                      LOGIN
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
