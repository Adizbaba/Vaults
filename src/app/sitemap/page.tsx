
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const mainLinks = [
  { href: '/', name: 'Home' },
  { href: '/about', name: 'About Us' },
  { href: '/careers', name: 'Careers' },
  { href: '/press', name: 'Press' },
  { href: '/blog', name: 'Blog' },
  { href: '/support', name: 'Support' },
  { href: '/faq', name: 'FAQs' },
];

const legalLinks = [
  { href: '/legal/privacy', name: 'Privacy Policy' },
  { href: '/legal/terms', name: 'Terms of Service' },
  { href: '/legal/disclosures', name: 'Disclosures' },
];

const authLinks = [
  { href: '/login', name: 'Login' },
  { href: '/signup', name: 'Open Account' },
];

const dashboardLinks = [
  { href: '/dashboard', name: 'Dashboard Overview' },
  { href: '/dashboard/accounts', name: 'Accounts' },
  { href: '/dashboard/transfer', name: 'Transfers' },
  { href: '/dashboard/bills', name: 'Bill Payments' },
  { href: '/dashboard/cards', name: 'Credit Cards' },
  { href: '/dashboard/loans', name: 'Loans' },
  { href: '/dashboard/transactions', name: 'Transactions' },
  { href: '/dashboard/reports', name: 'Reports' },
  { href: '/dashboard/statements', name: 'Statements' },
  { href: '/dashboard/profile', name: 'Profile' },
  { href: '/dashboard/settings', name: 'Settings' },
];


export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl text-primary">Sitemap</CardTitle>
            <p className="text-muted-foreground pt-2">A complete list of pages on VaultbyChase.</p>
          </CardHeader>
          <CardContent className="space-y-8 text-foreground/90 leading-relaxed">
            
            <SitemapSection title="Main Pages" links={mainLinks} />
            <SitemapSection title="Dashboard" links={dashboardLinks} />
            <SitemapSection title="Authentication" links={authLinks} />
            <SitemapSection title="Legal" links={legalLinks} />

          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}

const SitemapSection = ({ title, links }: { title: string, links: { href: string; name: string }[] }) => (
  <section>
    <h2 className="text-2xl font-semibold text-secondary mb-4 border-b pb-2">{title}</h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {links.map(link => (
        <li key={link.href}>
          <Link href={link.href} className="text-primary hover:underline">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </section>
);
