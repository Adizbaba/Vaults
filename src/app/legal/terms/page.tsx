
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl text-primary">Terms of Service</CardTitle>
            <p className="text-muted-foreground pt-2">Last Updated: {lastUpdated}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">1. Agreement to Terms</h2>
              <p>By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use our services. We may modify the Terms at any time, and such modifications shall be effective immediately upon posting of the modified Terms.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">2. Use of Services</h2>
              <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the services. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our services.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">3. Accounts</h2>
              <p>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">4. Governing Law</h2>
              <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is based, without regard to its conflict of law provisions.</p>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
