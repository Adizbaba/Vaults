
import Link from 'next/link';
import { Logo } from '@/components/icons/logo';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground dark:bg-gray-50 dark:text-gray-900 border-t border-border/10 mt-auto">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" aria-label="VaultbyChase Home">
               <Logo height={40} />
            </Link>
            <p className="mt-5 text-sm text-muted-foreground dark:text-gray-700 opacity-80 max-w-md">
              Empowering your financial future with intelligent, secure, and accessible banking solutions. Experience the future of finance, today.
            </p>
          </div>

          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-secondary-foreground dark:text-gray-800 mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Careers</Link></li>
              <li><Link href="/press" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Press</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-secondary-foreground dark:text-gray-800 mb-5">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/support" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Help Center</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">FAQs</Link></li>
              <li><Link href="/#security" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Security Information</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold tracking-wider uppercase text-secondary-foreground dark:text-gray-800 mb-5">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Terms of Service</Link></li>
              <li><Link href="/legal/disclosures" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Disclosures</Link></li>
              <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary-foreground dark:text-gray-600 dark:hover:text-[#003594] hover:underline opacity-90 hover:opacity-100 dark:opacity-100 transition-opacity">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground dark:text-gray-500 opacity-70 dark:opacity-100">
            &copy; {new Date().getFullYear()} VaultbyChase Financial Corp. All rights reserved. Member FDIC. Equal Housing Lender.
          </p>
          <div className="flex space-x-5 mt-6 md:mt-0">
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary-foreground dark:text-gray-500 dark:hover:text-[#003594] opacity-80 hover:opacity-100 dark:opacity-100 transition-all duration-300 hover:scale-110">
              <Linkedin size={22} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary-foreground dark:text-gray-500 dark:hover:text-[#003594] opacity-80 hover:opacity-100 dark:opacity-100 transition-all duration-300 hover:scale-110">
              <Twitter size={22} />
            </Link>
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary-foreground dark:text-gray-500 dark:hover:text-[#003594] opacity-80 hover:opacity-100 dark:opacity-100 transition-all duration-300 hover:scale-110">
              <Instagram size={22} />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary-foreground dark:text-gray-500 dark:hover:text-[#003594] opacity-80 hover:opacity-100 dark:opacity-100 transition-all duration-300 hover:scale-110">
              <Facebook size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
