'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const navbarRef = useRef(null);

  const pathname = usePathname();

  const isActive = (path) => pathname === path;

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

  return (
    <nav
      ref={navbarRef}
      className="sticky top-0 z-50 bg-background backdrop-blur border-b border-border"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Industrial steel manufacturing"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover drop-shadow-sm"
              priority
            />
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/">
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                HOME
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                ABOUT US
              </Button>
            </Link>

            <Link href="/solar-energy">
              <Button
                variant="ghost"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/solar-energy')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                SOLAR ENERGY
                <span className="ml-1 text-xs bg-primary text-white px-1.5 py-0.5 rounded">
                  PREMIUM
                </span>
              </Button>
            </Link>

            {/* SERVICES */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-colors"
                >
                  SERVICES <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border z-50">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      className={`w-full cursor-pointer px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive(item.path)
                          ? 'text-primary bg-primary/10'
                          : 'hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* PRODUCTS */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-colors"
                >
                  PRODUCTS <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border z-50">
                {productsItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      className={`w-full cursor-pointer px-3 py-2 rounded-md text-sm transition-colors ${
                        isActive(item.path)
                          ? 'text-primary bg-primary/10'
                          : 'hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/it-services">
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/it-services')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                IT SERVICES
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                CONTACT US
              </Button>
            </Link>

            {/* LOGIN */}
            <Link href="/login">
              <Button
                variant="ghost"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/login')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                LOGIN
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-md p-2 transition text-gray-800 hover:bg-primary hover:text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 sm:top-20 left-0 right-0 bg-background border-t border-border py-2 space-y-1 z-50 max-h-[80vh] overflow-y-auto">
            {/* HOME */}
            <Link href="/" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                HOME
              </Button>
            </Link>

            {/* ABOUT US */}
            <Link href="/about" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/about')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                ABOUT US
              </Button>
            </Link>

            {/* SOLAR ENERGY */}
            <Link href="/solar-energy" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/solar-energy')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                SOLAR ENERGY
              </Button>
            </Link>

            {/* SERVICES */}
            <div className="space-y-1">
              <button
                className="flex w-full items-center justify-between text-left px-4 py-3 rounded-none text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-colors"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
              >
                <span>SERVICES</span>
                {mobileServicesOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {mobileServicesOpen && (
                <div className="space-y-1 bg-gray-50/50">
                  {servicesItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={handleMobileLinkClick}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start px-6 py-2 rounded-none text-xs font-medium transition-colors ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-800 hover:bg-primary hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* PRODUCTS */}
            <div className="space-y-1">
              <button
                className="flex w-full items-center justify-between text-left px-4 py-3 rounded-none text-sm font-medium text-gray-800 hover:bg-primary hover:text-white transition-colors"
                onClick={() => setMobileProductsOpen((prev) => !prev)}
              >
                <span>PRODUCTS</span>
                {mobileProductsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>

              {mobileProductsOpen && (
                <div className="space-y-1 bg-gray-50/50">
                  {productsItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={handleMobileLinkClick}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start px-6 py-2 rounded-none text-xs font-medium transition-colors ${
                          isActive(item.path)
                            ? 'text-primary bg-primary/10'
                            : 'text-gray-800 hover:bg-primary hover:text-white'
                        }`}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* IT SERVICES */}
            <Link href="/it-services" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/it-services')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                IT SERVICES
              </Button>
            </Link>

            {/* CONTACT US */}
            <Link href="/contact" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/contact')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                CONTACT US
              </Button>
            </Link>

            {/* LOGIN */}
            <Link href="/login" onClick={handleMobileLinkClick}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-none text-sm font-medium transition-colors ${
                  isActive('/login')
                    ? 'text-primary bg-primary/10'
                    : 'text-gray-800 hover:bg-primary hover:text-white'
                }`}
              >
                LOGIN
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
