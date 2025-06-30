
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Shield, ArrowRightLeft, DollarSign } from 'lucide-react';

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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


export function FaqModal({ isOpen, onClose }: FaqModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl text-primary">
            <HelpCircle className="mr-3 h-7 w-7" />
            Frequently Asked Questions
          </DialogTitle>
          <DialogDescription>
            Find answers to common questions about our services.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="pr-6 -mr-6 flex-grow">
          <div className="space-y-8 py-4">
            {faqCategories.map((category) => (
              <section key={category.category}>
                <div className="flex items-center mb-4">
                  <category.icon className="h-6 w-6 text-secondary mr-3" />
                  <h2 className="text-xl font-bold text-secondary">{category.category}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem value={`item-${category.category}-${index}`} key={index}>
                      <AccordionTrigger className="text-left font-medium hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
