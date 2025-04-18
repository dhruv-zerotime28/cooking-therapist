'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Book, Info, Mail, Menu, X } from 'lucide-react';
import { ModeToggle } from '../../theme/mode-toggle';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/recipes', label: 'Recipes', icon: Book },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative flex h-16 items-center justify-between xl:mx-40 px-4 sm:px-6 lg:px-8">
        {/* Logo (Left) */}
        <div className="flex items-center flex-1 sm:flex-none">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              width={220}
              height={50}
              alt="logo"
              className="mix-blend-darken dark:mix-blend-lighten"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden z-50 text-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Navigation (Centered, Desktop) */}
        <nav className="hidden sm:flex items-center justify-center flex-1 space-x-6">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center space-x-1 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent',
                pathname === href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground/60 hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Mode Toggle (Right) */}
        <div className="hidden sm:flex justify-end items-center space-x-4 flex-1 sm:flex-none">
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-md sm:hidden animate-slide-down">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center space-x-2 p-3 rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
