
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DisclosuresPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl text-primary">Disclosures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">Electronic Fund Transfers</h2>
              <p>This disclosure provides information about your rights and responsibilities concerning electronic fund transfers (EFTs). EFTs are electronically initiated transfers of money from your account. This includes direct deposits, ATM transactions, and payments made via our online and mobile banking platforms.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">Funds Availability Policy</h2>
              <p>Our policy is to make funds from your cash and check deposits available to you on the first business day after the day we receive your deposit. Electronic direct deposits will be available on the day we receive the deposit. Once the funds are available, you can withdraw them in cash and we will use the funds to pay checks that you have written.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-secondary mb-3">Truth in Savings Disclosure</h2>
              <p>This disclosure contains information about the interest rates, annual percentage yields (APYs), and other terms for our deposit accounts. Please refer to the specific account agreement for detailed information about your account.</p>
            </section>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </>
  );
}
