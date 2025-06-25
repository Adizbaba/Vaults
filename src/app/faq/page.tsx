
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Shield, ArrowRightLeft, DollarSign, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const faqCategories = [
  {
    category: "General Account Management",
    icon: HelpCircle,
    questions: [
      {
        question: "How do I open a new account?",
        answer: "You can open a new account entirely online through our 'Open Account' page. The process is quick, secure, and takes only a few minutes. You'll need to provide some personal information and choose the account type you're interested in."
      },
      {
        question: "How do I find my account and routing numbers?",
        answer: "You can find your account and routing numbers by selecting an account on the 'Accounts' page in your dashboard and viewing the 'Account Details'. For security, we only display the last four digits of your account number online."
      },
      {
        question: "How do I order checks?",
        answer: "To order new checks, please navigate to your checking account details and select the 'Order Checks' option. You can also contact our support team for assistance."
      }
    ]
  },
  {
    category: "Security & Fraud",
    icon: Shield,
    questions: [
      {
        question: "Is my money insured?",
        answer: "Yes, VaultbyChase is a Member FDIC. Your eligible deposits are insured up to the maximum amount allowed by law, which is currently $250,000 per depositor, for each account ownership category."
      },
      {
        question: "How do I report a suspicious transaction or a lost/stolen card?",
        answer: "If you notice any suspicious activity or need to report a lost or stolen card, please contact us immediately at our 24/7 support line. You can also temporarily lock your card from the 'Credit Cards' page in your dashboard."
      },
      {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking the 'Forgot password?' link on the login page. Follow the instructions sent to your registered email address to create a new, secure password."
      }
    ]
  },
  {
    category: "Transfers & Payments",
    icon: ArrowRightLeft,
    questions: [
      {
        question: "What are the limits for online transfers?",
        answer: "Transfer limits vary based on your account type, history, and the transfer method (Internal, ACH, Zelle®). You can find specific details regarding your limits on the 'Transfers' page within your dashboard."
      },
      {
        question: "How long does it take for an external (ACH) transfer to complete?",
        answer: "Standard ACH transfers typically take 1-3 business days to process. The exact timing can depend on the recipient's bank and the time of day the transfer was initiated."
      }
    ]
  },
  {
    category: "Fees & Charges",
    icon: DollarSign,
    questions: [
       {
        question: "What are the monthly maintenance fees?",
        answer: "Many of our accounts, like the Primary Checking account, have no monthly maintenance fees when you meet certain requirements, such as maintaining a minimum daily balance or setting up direct deposit. Please refer to your specific account agreement for details."
      },
      {
        question: "Are there fees for using non-VaultbyChase ATMs?",
        answer: "There may be a fee for using an ATM outside of our network, and the ATM operator may also charge a separate fee. We offer accounts with ATM fee rebates; please check your account features to see if you qualify."
      }
    ]
  }
];

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <section id="hero-faq" className="text-center py-16 bg-muted rounded-lg shadow-inner mb-16">
          <HelpCircle className="mx-auto h-16 w-16 text-primary mb-6" />
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Have questions? We've got answers. Find quick solutions to common inquiries about our services, security, and account management.
          </p>
        </section>

        {faqCategories.map((category) => (
          <section key={category.category} className="mb-12">
            <div className="flex items-center mb-6">
              <category.icon className="h-8 w-8 text-secondary mr-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-secondary">{category.category}</h2>
            </div>
            <Card className="shadow-lg">
                <CardContent className="p-0">
                     <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, index) => (
                            <AccordionItem value={`item-${category.category}-${index}`} key={index} className={index === category.questions.length - 1 ? "border-b-0" : ""}>
                                <AccordionTrigger className="text-left px-6 py-4 text-base font-medium hover:bg-muted/50 transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
          </section>
        ))}

        <section className="text-center py-12 bg-primary text-primary-foreground rounded-lg shadow-xl">
             <h2 className="text-3xl font-bold mb-4">Can't Find Your Answer?</h2>
             <p className="max-w-xl mx-auto mb-8 text-primary-foreground/90">
                Our support team is ready to assist you. Visit our support page for more contact options or to start a live chat.
             </p>
             <Button variant="outline" size="lg" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Link href="/support">
                    Contact Support
                </Link>
             </Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
