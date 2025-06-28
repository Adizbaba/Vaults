
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react";
import { format } from 'date-fns';
import Link from "next/link";
import type { Transaction } from "@/types/accounts"; // Using the more detailed Transaction type

// Default mock transactions if none are passed (can be removed if always provided)
const defaultMockTransactions: Transaction[] = [
  { id: "txn1", accountId: "defaultAcc", date: "2025-06-10", description: "Online Purchase - Amazon", amount: -75.5, type: "debit", status: "failed" },
  { id: "cashtxn1", accountId: "defaultAcc", date: "2025-06-09", description: "Cash App Transfer", amount: -420, type: "debit", status: "failed" },
  { id: "txn8", accountId: "defaultAcc", date: "2025-06-05", description: "Utility Bill Payment", amount: -150.25, type: "payment", status: "failed" },
  { id: "txn9", accountId: "defaultAcc", date: "2025-06-02", description: "Spotify Premium", amount: -10.99, type: "debit", status: "failed" },
  { id: "dd_jun1_25", accountId: "defaultAcc", date: "2025-06-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "txn3", accountId: "defaultAcc", date: "2025-05-26", description: "Online Subscription - Netflix", amount: -12.99, type: "debit", status: "completed" },
  { id: "txn4", accountId: "defaultAcc", date: "2025-05-16", description: "Transfer to Savings", amount: -500, type: "transfer_out", status: "completed" },
  { id: "dd_may15_25", accountId: "defaultAcc", date: "2025-05-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "txn5", accountId: "defaultAcc", date: "2025-05-14", description: "Restaurant Bill", amount: -45, type: "debit", status: "completed" },
  { id: "dd_may1_25", accountId: "defaultAcc", date: "2025-05-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "txn7", accountId: "defaultAcc", date: "2025-04-22", description: "Refund from Amazon", amount: 30.25, type: "credit", status: "completed" },
  { id: "cashtxn2", accountId: "defaultAcc", date: "2025-04-20", description: "Cash App Transfer", amount: -950, type: "debit", status: "completed" },
  { id: "dd_apr15_25", accountId: "defaultAcc", date: "2025-04-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_apr1_25", accountId: "defaultAcc", date: "2025-04-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_mar15_25", accountId: "defaultAcc", date: "2025-03-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "cashtxn3", accountId: "defaultAcc", date: "2025-03-10", description: "Cash App Transfer", amount: -2000, type: "debit", status: "completed" },
  { id: "dd_mar1_25", accountId: "defaultAcc", date: "2025-03-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_feb15_25", accountId: "defaultAcc", date: "2025-02-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_feb1_25", accountId: "defaultAcc", date: "2025-02-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jan15_25", accountId: "defaultAcc", date: "2025-01-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jan1_25", accountId: "defaultAcc", date: "2025-01-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_dec15_24", accountId: "defaultAcc", date: "2024-12-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_dec1_24", accountId: "defaultAcc", date: "2024-12-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_nov15_24", accountId: "defaultAcc", date: "2024-11-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_nov1_24", accountId: "defaultAcc", date: "2024-11-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_oct15_24", accountId: "defaultAcc", date: "2024-10-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_oct1_24", accountId: "defaultAcc", date: "2024-10-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_sep15_24", accountId: "defaultAcc", date: "2024-09-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_sep1_24", accountId: "defaultAcc", date: "2024-09-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_aug15_24", accountId: "defaultAcc", date: "2024-08-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_aug1_24", accountId: "defaultAcc", date: "2024-08-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jul15_24", accountId: "defaultAcc", date: "2024-07-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jul1_24", accountId: "defaultAcc", date: "2024-07-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jun15_24", accountId: "defaultAcc", date: "2024-06-15", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
  { id: "dd_jun1_24", accountId: "defaultAcc", date: "2024-06-01", description: "Direct Deposit - Payroll", amount: 5530, type: "credit", status: "completed" },
];

interface TransactionHistoryProps {
  title?: string;
  transactions?: Transaction[];
  defaultItemsToShow?: number;
  showFilters?: boolean;
  accountIdContext?: string; // To contextualize "View All" link if needed
}

export function TransactionHistory({ 
  title = "Transaction History", 
  transactions = defaultMockTransactions,
  defaultItemsToShow,
  showFilters = true,
  accountIdContext,
}: TransactionHistoryProps) {
  const [filterText, setFilterText] = useState("");
  const [filterTxnType, setFilterTxnType] = useState<Transaction["type"] | "all">("all");
  const [filterStatus, setFilterStatus] = useState<Transaction["status"] | "all">("all");

  const itemsToDisplay = defaultItemsToShow ? transactions.slice(0, defaultItemsToShow) : transactions;

  const filteredTransactions = itemsToDisplay.filter(txn => {
    const matchesText = txn.description.toLowerCase().includes(filterText.toLowerCase());
    const matchesType = filterTxnType === "all" || txn.type === filterTxnType;
    const matchesStatus = filterStatus === "all" || txn.status === filterStatus;
    return matchesText && matchesType && matchesStatus;
  });

  const getBadgeVariant = (type: Transaction["type"]) => {
    switch (type) {
      case "credit":
      case "transfer_in":
      case "interest":
      case "dividend":
      case "investment_sell":
        return "default"; // Typically positive/greenish in theme
      case "debit":
      case "transfer_out":
      case "fee":
      case "payment": // e.g. bill payment
      case "investment_buy":
        return "destructive"; // Typically negative/reddish
      default:
        return "secondary";
    }
  };
  
  const viewAllLink = accountIdContext 
    ? `/dashboard/transactions?accountId=${accountIdContext}`
    : "/dashboard/transactions";


  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <CardTitle className="text-xl text-secondary">{title}</CardTitle>
            <CardDescription>View and manage your recent transactions.</CardDescription>
          </div>
          {showFilters && (
             <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Download CSV
            </Button>
          )}
        </div>
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Input 
              placeholder="Filter by description..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="max-w-xs"
            />
            <Select value={filterTxnType} onValueChange={(value) => setFilterTxnType(value as Transaction["type"] | "all")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="transfer_in">Transfer In</SelectItem>
                <SelectItem value="transfer_out">Transfer Out</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="interest">Interest</SelectItem>
                <SelectItem value="dividend">Dividend</SelectItem>
                <SelectItem value="investment_buy">Investment Buy</SelectItem>
                <SelectItem value="investment_sell">Investment Sell</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as Transaction["status"] | "all")}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell>{format(new Date(txn.date), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="font-medium">{txn.description}</TableCell>
                    <TableCell className={`text-right ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.amount >= 0 ? <ArrowUp className="inline h-4 w-4 mr-1" /> : <ArrowDown className="inline h-4 w-4 mr-1" /> }
                      ${Math.abs(txn.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(txn.type)} className="capitalize">
                        {txn.type.replace(/_/g, ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          txn.status === 'completed' ? 'outline' : 
                          txn.status === 'pending' ? 'default' : 
                          'destructive'
                        } 
                        className="capitalize border-current"
                      >
                        {txn.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List View */}
        <div className="md:hidden space-y-3">
            {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn) => (
                    <div key={txn.id} className="p-4 border rounded-lg flex justify-between items-center bg-background hover:bg-muted/50 transition-colors">
                        <div>
                            <p className="font-semibold text-foreground">{txn.description}</p>
                            <p className="text-sm text-muted-foreground">{format(new Date(txn.date), 'MMM dd, yyyy')}</p>
                            <Badge variant={getBadgeVariant(txn.type)} className="capitalize mt-1">
                                {txn.type.replace(/_/g, ' ')}
                            </Badge>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className={`font-bold text-lg ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {txn.amount >= 0 ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}
                            </p>
                            <p className={`text-xs font-medium ${ txn.status === 'completed' ? 'text-muted-foreground' : 'text-amber-600'}`}>
                                {txn.status}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted-foreground py-8">No transactions found.</p>
            )}
        </div>

        {/* Show "View All" if there are more transactions than displayed (and not on the main transactions page) */}
        {defaultItemsToShow && transactions.length > defaultItemsToShow && (
            <div className="mt-6 text-center">
                <Button variant="link" asChild>
                    <Link href={viewAllLink}>View All Transactions</Link>
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
