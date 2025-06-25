
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { ThemeToggleButton } from '@/components/theme-toggle-button';

interface NavItem {
  label: string;
  href: string;
  isPageLink?: boolean; 
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/#home', isPageLink: false },
  { label: 'Features', href: '/#features', isPageLink: false },
  { label: 'Why Us', href: '/#why-vaultbychase', isPageLink: false },
  { label: 'Security', href: '/#security', isPageLink: false },
  { label: 'Support', href: '/support', isPageLink: true },
];

const authNavItems: NavItem[] = [
  { label: 'Login', href: '/login', isPageLink: true },
  { label: 'Open Account', href: '/signup', isPageLink: true },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isPageLink?: boolean) => {
    setIsMenuOpen(false);
    if (!isPageLink && href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2); 
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '/#home' || href === '/') { 
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (isDashboard) {
    return null; 
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/95 shadow-lg backdrop-blur-md' : 'bg-background'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="VaultbyChase Home" onClick={(e) => handleNavLinkClick(e, '/#home', false)}>
          <Logo height={36} priority />
        </Link>

        <nav className="hidden items-center space-x-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavLinkClick(e, item.href, item.isPageLink)}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-3 md:flex">
          <ThemeToggleButton />
          <Button variant="outline" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Open Account</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggleButton />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-xl absolute w-full left-0 top-20 border-t border-border">
          <nav className="flex flex-col space-y-1 p-4">
            {[...navItems, ...authNavItems].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavLinkClick(e, item.href, item.isPageLink)}
                className="block py-3 px-3 text-foreground hover:text-primary transition-colors text-center rounded-md hover:bg-muted text-base font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
