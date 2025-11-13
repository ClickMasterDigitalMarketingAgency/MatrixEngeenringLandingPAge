'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const servicesItems = [
    {
      label: 'Telecom Equipment Installation and Commissioning',
      path: '/services/telecom-equipment',
    },
    {
      label: 'In Building Solution (IBS)',
      path: '/services/in-building-solution',
    },
    {
      label: 'Telecom Civil Infrastructure',
      path: '/services/civil-infrastructure',
    },
    {
      label: 'Buildings and Roads Construction',
      path: '/services/construction',
    },
    { label: 'RF Planning and Optimization', path: '/services/rf-planning' },
    { label: 'Logistics and Warehousing', path: '/services/logistics' },
  ];

  const productsItems = [
    { label: 'Solar Power Solutions', path: '/products/solar' },
    { label: 'Telecom Cabinets', path: '/products/cabinets' },
    { label: 'Galvanized Towers', path: '/products/towers' },
    { label: 'Cell on Wheel Towers (COW)', path: '/products/cow' },
    { label: 'Diesel Generators', path: '/products/generators' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-background backdrop-blur border-b border-border'
          : 'bg-background backdrop-blur border-b border-border'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Industrial steel manufacturing"
              width={64}
              height={64}
              className="w-16 h-auto object-cover drop-shadow-sm"
              priority
            />
            <div className="ml-3 leading-tight">
              <span
                className={`text-2xl font-bold ${
                  isScrolled ? 'text-gray-900' : 'text-primary'
                }`}
              >
                MATRIX ENGINEERING
              </span>
              <div
                className={`text-xs -mt-1 ${
                  isScrolled ? 'text-gray-600' : 'text-foreground'
                }`}
              >
                PRIVATE LIMITED
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link href="/">
              <Button
                variant="ghost"
                className={`${
                  isActive('/')
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary/50'
                }`}
              >
                HOME
              </Button>
            </Link>

            <Link href="/about">
              <Button
                variant="ghost"
                className={`${
                  isActive('/about')
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary/50'
                }`}
              >
                ABOUT US
              </Button>
            </Link>

            <Link href="/solar-energy">
              <Button
                variant="ghost"
                className={`flex items-center ${
                  isActive('/solar-energy')
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary/50'
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
                  className={`flex items-center text-gray-800 hover:text-primary/50`}
                >
                  SERVICES <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border z-50">
                {servicesItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path)
                          ? 'text-primary'
                          : 'hover:text-primary/50'
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
                  className={`flex items-center text-gray-800 hover:text-primary/50`}
                >
                  PRODUCTS <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 bg-background border-border z-50">
                {productsItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      href={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path)
                          ? 'text-primary'
                          : 'hover:text-primary/50'
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
                className={`${
                  isActive('/it-services')
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary/50'
                }`}
              >
                IT SERVICES
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="ghost"
                className={`${
                  isActive('/contact')
                    ? 'text-primary'
                    : 'text-gray-800 hover:text-primary/50'
                }`}
              >
                CONTACT US
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden rounded-md p-2 transition text-gray-800 hover:bg-gray-100`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          <div className="lg:hidden py-4 space-y-2">
            {[
              { label: 'HOME', path: '/' },
              { label: 'ABOUT US', path: '/about' },
              { label: 'SOLAR ENERGY', path: '/solar-energy' },
              { label: 'IT SERVICES', path: '/it-services' },
              { label: 'CONTACT US', path: '/contact' },
            ].map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive(path)
                      ? 'text-primary'
                      : 'text-gray-800 hover:text-primary/50'
                  }`}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}