"use client";

import { useEffect, useState } from 'react';
import { AccountSummaryCard } from "@/components/dashboard/account-summary-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, X, DollarSign, CreditCard as CreditCardIconLucide, Briefcase, TrendingUp, ArrowRightLeft, Send, FileText, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { TransactionHistory } from "@/components/dashboard/transaction-history";
import { auth } from '@/lib/firebase/clientApp';
import { onAuthStateChanged, User } from 'firebase/auth';
import type { AccountDetail, CheckingAccountDetails, SavingsAccountDetails, InvestmentAccountDetails, CreditCardAccountDetails } from "@/types/accounts";
import { AccountDetailsModal } from "@/components/dashboard/account-details-modal";
import { addDays, subDays, formatISO, format } from 'date-fns';

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Initial Mock Data (suffixes will be randomized client-side)
const initialMockAccounts: AccountDetail[] = [
  {
    id: "checking123",
    userId: "userTest1",
    accountName: "Primary Checking",
    accountType: "checking",
    accountNumberSuffix: "1234", // Placeholder
    balance: 147342.28, // Updated
    availableBalance: 147300.00, // Updated
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 365)),
    icon: DollarSign,
    overdraftProtectionEnabled: true,
    linkedDebitCardNumberSuffix: "7890",
    last5Transactions: [
      { id: "ctxn1", date: formatISO(subDays(new Date(), 1)), description: "Paycheck Deposit", amount: 2200.00, type: "credit" },
      { id: "ctxn2", date: formatISO(subDays(new Date(), 2)), description: "Rent Payment", amount: -1500.00, type: "debit" },
      { id: "ctxn3", date: formatISO(subDays(new Date(), 3)), description: "Groceries", amount: -85.20, type: "debit" },
      { id: "ctxn4", date: formatISO(subDays(new Date(), 4)), description: "Online Shopping", amount: -42.99, type: "debit" },
      { id: "ctxn5", date: formatISO(subDays(new Date(), 5)), description: "ATM Withdrawal", amount: -100.00, type: "debit" },
    ],
    monthlyActivityFee: null,
    eStatementsEnabled: true,
  },
  {
    id: "savings456",
    userId: "userTest1",
    accountName: "High-Yield Savings",
    accountType: "savings",
    accountNumberSuffix: "5678", // Placeholder
    balance: 280483.09, // Updated
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 730)),
    icon: Briefcase,
    interestRate: 0.045, // 4.5%
    apy: 0.0458, // Approx APY for 4.5% monthly compounding
    compoundingFrequency: "monthly",
    minimumBalanceRequired: 100.00,
    withdrawalLimits: { countPerCycle: 6, cycleType: "month", currentCycleWithdrawals: 2 },
    interestEarnedYTD: 250.30,
  },
  {
    id: "investment789",
    userId: "userTest1",
    accountName: "Growth Portfolio",
    accountType: "investment",
    accountNumberSuffix: "9012", // Placeholder
    balance: 0, 
    portfolioValue: 75300.50,
    totalInvestment: 65000.00,
    totalGainLoss: 10300.50,
    totalGainLossPercentage: (10300.50 / 65000),
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 180)),
    icon: TrendingUp,
    holdingCount: 3, 
    majorHoldings: [
      { id: "h1", symbol: "AAPL", name: "Apple Inc.", quantity: 50, currentValue: 9500.00, currentPrice: 190, dayChange: 2.50, dayChangePercentage: 0.013 },
      { id: "h2", symbol: "MSFT", name: "Microsoft Corp.", quantity: 30, currentValue: 12000.00, currentPrice: 400, dayChange: -1.20, dayChangePercentage: -0.003 },
      { id: "h3", symbol: "VOO", name: "Vanguard S&P 500 ETF", quantity: 100, currentValue: 45000.00, currentPrice: 450, dayChange: 5.00, dayChangePercentage: 0.011 },
    ],
    investmentStrategy: "Growth",
    investmentRiskLevel: "moderately_aggressive",
    dividendIncomeYTD: 350.00,
  },
  {
    id: "cc101", // This is a Visa, assumed to be "Rewards Visa"
    userId: "userTest1",
    accountName: "Rewards Visa",
    accountType: "credit_card",
    accountNumberSuffix: "3456", // Placeholder
    balance: -1403.42, // Updated
    creditLimit: 10000.00,
    availableCredit: 10000.00 - 1403.42, // Updated
    currency: "USD",
    status: "active",
    dateOpened: formatISO(subDays(new Date(), 500)),
    icon: CreditCardIconLucide,
    currentStatementBalance: 750.00, // Assuming this doesn't change with balance for mock data
    minimumPaymentDue: 35.00, // Assuming this doesn't change with balance for mock data
    paymentDueDate: formatISO(addDays(new Date(), 15)),
    interestRateAPR: { purchase: 0.1999, cashAdvance: 0.2499 },
    rewardsBalance: { points: 12500, type: "points", description: "Travel Points" },
    lastPaymentAmount: 100.00,
    lastPaymentDate: formatISO(subDays(new Date(), 10)),
  },
];


const quickActions = [
  { label: "Transfer Funds", href: "/dashboard/transfer", icon: ArrowRightLeft },
  { label: "Pay Bills", href: "/dashboard/bills", icon: Send },
  { label: "View Statements", href: "/dashboard/statements", icon: FileText },
  { label: "Manage Alerts", href: "/dashboard/settings/alerts", icon: Settings },
];

export default function DashboardOverviewPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<AccountDetail | null>(null);
  const [displayedAccounts, setDisplayedAccounts] = useState<AccountDetail[]>(initialMockAccounts);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const displayName = user.displayName;
        if (displayName) {
          setUserName(displayName.split(' ')[0]); 
        } else {
          setUserName("User"); 
        }
      } else {
        setUserName("User"); 
      }
      setIsLoading(false);
    });

    // Randomize account suffixes on client-side
    setDisplayedAccounts(prevAccounts => 
      prevAccounts.map(account => ({
        ...account,
        accountNumberSuffix: generateRandomFourDigitString(),
      }))
    );

    return () => unsubscribe();
  }, []);

  const handleViewDetails = (account: AccountDetail) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-1">Welcome Back, {userName || "User"}!</h2>
        <p className="text-muted-foreground">Here&apos;s a quick overview of your finances.</p>
      </div>

      {isAlertVisible && (
        <Alert className="relative animate-subtle-pulse border bg-red-100 border-red-300 text-red-700 dark:bg-red-400/20 dark:border-red-500/40 dark:text-red-300">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 text-red-800 hover:bg-red-200/50 hover:text-red-800 dark:text-red-200 dark:hover:bg-red-400/30"
            onClick={() => setIsAlertVisible(false)}
            aria-label="Dismiss notice"
          >
            <X className="h-4 w-4" />
          </Button>
          <AlertTriangle className="h-5 w-5 text-current" />
          <AlertTitle className="font-bold text-lg">Account Notice</AlertTitle>
          <AlertDescription>
            Due to multiple transaction errors, certain features on your account have been temporarily restricted to protect your security. Please visit your nearest VaultbyChase branch to resolve this issue.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {displayedAccounts.map(acc => (
          <AccountSummaryCard 
            key={acc.id}
            account={acc}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TransactionHistory title="Recent Activity" defaultItemsToShow={5} showFilters={false} />
        </div>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl text-secondary">Quick Actions</CardTitle>
            <CardDescription>Access common tasks quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {quickActions.map(action => (
              <Button variant="outline" asChild key={action.label} className="justify-start">
                <Link href={action.href}>
                  <action.icon className="mr-2 h-5 w-5 text-primary" />
                  {action.label}
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
      <AccountDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} account={selectedAccount} />
    </div>
  );
}
