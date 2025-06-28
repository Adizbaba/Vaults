
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
  { id: "txn1", accountId: "defaultAcc", date: "2025-06-10", description: "Online Purchase", amount: -75.50, type: "debit", status: "completed" },
  { id: "txn2", accountId: "defaultAcc", date: "2025-06-07", description: "Direct Deposit", amount: 6530.00, type: "credit", status: "completed" },
  { id: "txn3", accountId: "defaultAcc", date: "2025-05-26", description: "Online Subscription", amount: -12.99, type: "debit", status: "completed" },
  { id: "txn4", accountId: "defaultAcc", date: "2025-05-15", description: "Transfer to Savings", amount: -500.00, type: "transfer_out", status: "completed" },
  { id: "txn5", accountId: "defaultAcc", date: "2025-05-14", description: "Restaurant Bill", amount: -45.00, type: "debit", status: "completed" },
  { id: "txn6", accountId: "defaultAcc", date: "2025-05-10", description: "Cash App Transfer", amount: -100.00, type: "debit", status: "completed" },
  { id: "txn7", accountId: "defaultAcc", date: "2025-04-22", description: "Refund from Amazon", amount: 30.25, type: "credit", status: "completed" },
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
