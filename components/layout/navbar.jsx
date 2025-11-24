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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileServicesOpen(false);
        setMobileProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const servicesItems = [
    { label: 'IT Services', path: '/services/it-services' },
    { label: 'Solar Energy', path: '/services/solar-energy' },
    { label: 'RF Planning and Optimization', path: '/services/rf-planning' },
    { label: 'Buildings and Roads Construction', path: '/services/construction' },
    { label: 'In Building Solution (IBS)', path: '/services/in-building-solution' },
    { label: 'Telecom Civil Infrastructure', path: '/services/civil-infrastructure' },
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

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 30, duration: 0.6 },
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' },
  };

  const dropdownItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const staggerVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
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
      <div className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20">

          {/* LOGO */}
          <motion.div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={50}
                height={50}
                className="w-10 h-10 sm:w-14 sm:h-14"
                priority
              />
              <div className="ml-2 leading-tight">
                <span className="text-base sm:text-xl font-bold text-primary block">
                  MATRIX ENGINEERING
                </span>
                <span className="text-base sm:text-xl font-bold text-primary block -mt-1">
                  SERVICES
                </span>
                <div className="text-[10px] sm:text-xs -mt-1 text-foreground">
                  PRIVATE LIMITED
                </div>
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-1">
            <NavLink label="HOME" path="/" isActive={isActive} />
            <NavLink label="ABOUT US" path="/about" isActive={isActive} />

            {/* SERVICES */}
            <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm">
                  SERVICES <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* PRODUCTS */}
            <DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm">
                  PRODUCTS <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64">
                {productsItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      onClick={() => setProductsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink label="CONTACT US" path="/contact" isActive={isActive} />
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-background border-t border-border py-2 space-y-1 z-50 max-h-[80vh] overflow-y-auto"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* MAIN LINKS */}
              <MobileLink label="HOME" path="/" isActive={isActive} onClick={handleMobileLinkClick} />
              <MobileLink label="ABOUT US" path="/about" isActive={isActive} onClick={handleMobileLinkClick} />

              {/* SERVICES DROPDOWN */}
              <MobileDropdown
                title="SERVICES"
                open={mobileServicesOpen}
                setOpen={setMobileServicesOpen}
                items={servicesItems}
                isActive={isActive}
                onClick={handleMobileLinkClick}
              />

              {/* PRODUCTS DROPDOWN */}
              <MobileDropdown
                title="PRODUCTS"
                open={mobileProductsOpen}
                setOpen={setMobileProductsOpen}
                items={productsItems}
                isActive={isActive}
                onClick={handleMobileLinkClick}
              />

              <MobileLink label="CONTACT US" path="/contact" isActive={isActive} onClick={handleMobileLinkClick} />
              <MobileLink label="LOGIN" path="/login" isActive={isActive} onClick={handleMobileLinkClick} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

/* SMALL HELPER COMPONENTS */

function NavLink({ label, path, isActive }) {
  return (
    <Link href={path}>
      <Button
        variant="ghost"
        className={`px-3 py-2 text-sm ${
          isActive(path)
            ? 'text-primary bg-primary/10'
            : 'hover:bg-primary hover:text-white'
        }`}
      >
        {label}
      </Button>
    </Link>
  );
}

function MobileLink({ label, path, isActive, onClick }) {
  return (
    <Link href={path} onClick={onClick}>
      <Button
        variant="ghost"
        className={`w-full justify-start px-4 py-3 text-sm ${
          isActive(path)
            ? 'text-primary bg-primary/10'
            : 'hover:bg-primary hover:text-white'
        }`}
      >
        {label}
      </Button>
    </Link>
  );
}

function MobileDropdown({ title, open, setOpen, items, isActive, onClick }) {
  return (
    <div className="space-y-1">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-sm hover:bg-primary hover:text-white"
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div className="space-y-1 bg-gray-50/50 px-2 py-1">
            {items.map((item) => (
              <Link key={item.path} href={item.path} onClick={onClick}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start px-6 py-2 text-xs ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'hover:bg-primary hover:text-white'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
