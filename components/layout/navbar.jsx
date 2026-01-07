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
 
  const glowBtn =
    'text-white hover:text-white bg-transparent hover:bg-white/10 ' +
    'drop-shadow-[0_0_10px_rgba(59,130,246,0.75)] ' +
    'hover:drop-shadow-[0_0_16px_rgba(59,130,246,0.95)]';

  const normalBtn =
    'text-foreground hover:bg-primary hover:text-white';


  const ghostWhite = 'text-white hover:bg-white/10 hover:text-white';
  const ghostNormal = 'text-foreground hover:bg-primary hover:text-white';

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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll(); // ✅ set initial state correctly
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    { label: 'Towers Construction & Maintenance', path: '/services/towers' },
    { label: 'SRAN Solution', path: '/services/sran' },
    { label: 'MORAN', path: '/services/moran' },
    { label: 'Cell on Wheels (COW)', path: '/services/cow' },
    { label: 'In Building Solution (IBS)', path: '/services/in-building-solution' },
    { label: 'Telecom Civil Infrastructure', path: '/services/civil-infrastructure' },
    { label: 'Logistics and Warehousing', path: '/services/logistics' },
    {
      label: 'Telecom Equipment Installation and Commissioning',
      path: '/services/telecom-equipment',
    },
  ];

  const productsItems = [
    { label: 'Galvanized Towers', path: '/products/galvanized-towers' },
    { label: 'Diesel Generators', path: '/products/generators' },
    { label: 'Solar Power Solutions', path: '/products/solar' },
    { label: 'Cell on Wheel Towers (COW)', path: '/products/cow' },
    { label: 'Telecom Cabinets', path: '/products/cabinets' },
    { label: 'Towers', path: '/products/towers' },
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

  const transparent = !isScrolled;

  return (
    <motion.nav
      ref={navbarRef}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg'
          : 'bg-transparent border-transparent shadow-none'}
      `}
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
                className="w-14 h-14 sm:w-23 sm:h-23"
                priority
              />
              <div className="ml-2 leading-tight">
                <span className="text-md sm:text-2xl font-bold text-primary block">
                  MATRIX SERVICES
                </span>
                <div
                  className={`text-[10px] sm:text-sm -mt-1 font-medium ${transparent ? 'text-white/90' : 'text-foreground'
                    }`}
                >
                  PVT LIMITED
                </div>
              </div>
            </Link>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* ✅ Glow only on transparent */}
            <NavLink
              label="HOME"
              path="/"
              isActive={isActive}
              transparent={transparent}
              glowBtn={glowBtn}
              normalBtn={normalBtn}
            />
            <NavLink
              label="ABOUT US"
              path="/about"
              isActive={isActive}
              transparent={transparent}
              glowBtn={glowBtn}
              normalBtn={normalBtn}
            />

            {/* SERVICES */}
            <DropdownMenu open={servicesOpen} onOpenChange={setServicesOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm transition-all duration-300 ${transparent ? ghostWhite : ghostNormal
                    }`}
                >
                  SERVICES <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link href={item.path} onClick={() => setServicesOpen(false)}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* PRODUCTS */}
            <DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`text-sm transition-all duration-300 ${transparent ? ghostWhite : ghostNormal
                    }`}
                >
                  PRODUCTS <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-64">
                {productsItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link href={item.path} onClick={() => setProductsOpen(false)}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink
              label="CONTACT US"
              path="/contact"
              isActive={isActive}
              transparent={transparent}
              glowBtn={glowBtn}
              normalBtn={normalBtn}
              forceNoGlow
            />
          </div>

          {/* MOBILE MENU BUTTON */}
          <motion.button
            className={`lg:hidden p-2 rounded-md transition ${transparent ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-primary/10'
              }`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
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
              <MobileLink label="HOME" path="/" isActive={isActive} onClick={handleMobileLinkClick} />
              <MobileLink label="ABOUT US" path="/about" isActive={isActive} onClick={handleMobileLinkClick} />

              <MobileDropdown
                title="SERVICES"
                open={mobileServicesOpen}
                setOpen={setMobileServicesOpen}
                items={servicesItems}
                isActive={isActive}
                onClick={handleMobileLinkClick}
              />

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

function NavLink({ label, path, isActive, transparent, glowBtn, normalBtn, forceNoGlow }) {
  const active = isActive(path) ? 'text-primary bg-primary/10' : '';

  // ✅ Only HOME/ABOUT glow when transparent
  const transparentStyle = forceNoGlow ? 'text-white hover:bg-white/10 hover:text-white' : glowBtn;

  const style = transparent ? transparentStyle : normalBtn;

  return (
    <Link href={path}>
      <Button variant="ghost" className={`px-3 py-2 text-sm transition-all duration-300 ${active} ${style}`}>
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
        className={`w-full justify-start px-4 py-3 text-sm ${isActive(path) ? 'text-primary bg-primary/10' : 'hover:bg-primary hover:text-white'
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
        type="button"
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
                  className={`w-full justify-start px-6 py-2 text-xs ${isActive(item.path) ? 'text-primary bg-primary/10' : 'hover:bg-primary hover:text-white'
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
