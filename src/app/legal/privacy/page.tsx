
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl text-primary">Privacy Policy</CardTitle>
            <p className="text-muted-foreground pt-2">Last Updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">1. Introduction</h2>
              <p>Welcome to VaultbyChase. We are committed to protecting your privacy and handling your personal data in an open and transparent manner. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 mt-2">
                <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, address, email address, and telephone number, that you voluntarily give to us when you register with the Site or use our services.</li>
                <li><strong>Financial Data:</strong> Financial information related to your accounts, transactions, and banking activities.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website and services, such as your IP address, browser type, and browsing patterns.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">3. Use of Your Information</h2>
              <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to create and manage your account, process your transactions, and provide you with customer support.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">4. Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at: support@vaultbychase.com.</p>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
