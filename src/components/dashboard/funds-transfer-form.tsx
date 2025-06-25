
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const generateRandomFourDigitString = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const transferSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account to transfer from."),
  toAccount: z.string().min(1, "Please select an account to transfer to."),
  amount: z.coerce.number().positive("Amount must be positive.").min(0.01, "Amount must be at least $0.01."),
  memo: z.string().optional(),
}).refine(data => data.fromAccount !== data.toAccount, {
  message: "Cannot transfer to the same account.",
  path: ["toAccount"],
});

type TransferFormValues = z.infer<typeof transferSchema>;

// Initial mock user accounts
const initialUserAccounts = [
  { id: "checking123", name: "Primary Checking (•••• 1234)", balance: 147342.28 },
  { id: "savings5678", name: "High-Yield Savings (•••• 5678)", balance: 280483.09 },
  { id: "investment9012", name: "Investment Portfolio (•••• 9012)", balance: 75300.50 },
];

const DetailRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="flex justify-between items-center py-2 border-b border-dashed">
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground text-right">{value}</p>
  </div>
);

export function FundsTransferForm() {
  const { toast } = useToast();
  const [displayedUserAccounts, setDisplayedUserAccounts] = useState(initialUserAccounts);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<TransferFormValues | null>(null);

  useEffect(() => {
    setDisplayedUserAccounts(prevAccounts =>
      prevAccounts.map(acc => ({
        ...acc,
        name: acc.name.replace(/\(•••• \d{4}\)/, `(•••• ${generateRandomFourDigitString()})`),
      }))
    );
  }, []);
  
  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: { fromAccount: "", toAccount: "", amount: 0, memo: "" },
  });

  const onSubmit = (data: TransferFormValues) => {
    setConfirmationData(data);
    setIsConfirming(true);
  };

  const handleConfirmTransfer = async () => {
    if (!confirmationData) return;
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Transfer data confirmed:", confirmationData);
    toast({
      title: "Transfer Successful",
      description: `$${confirmationData.amount.toFixed(2)} transferred from ${displayedUserAccounts.find(acc => acc.id === confirmationData.fromAccount)?.name} to ${displayedUserAccounts.find(acc => acc.id === confirmationData.toAccount)?.name}.`,
      variant: "default", 
    });
    
    setIsSubmitting(false);
    setIsConfirming(false);
    setConfirmationData(null);
    form.reset();
  };

  const fromAccountName = confirmationData ? displayedUserAccounts.find(acc => acc.id === confirmationData.fromAccount)?.name : 'N/A';
  const toAccountName = confirmationData ? displayedUserAccounts.find(acc => acc.id === confirmationData.toAccount)?.name : 'N/A';

  return (
    <>
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Transfer Funds</CardTitle>
          <CardDescription>Move money securely between your VaultbyChase accounts.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="fromAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account to transfer from" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {displayedUserAccounts.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name} - Balance: ${acc.balance.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Account</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account to transfer to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {displayedUserAccounts.map(acc => (
                          <SelectItem key={acc.id} value={acc.id}>
                            {acc.name} - Balance: ${acc.balance.toFixed(2)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span>
                        <Input type="number" placeholder="0.00" {...field} className="pl-7" step="0.01" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Memo (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="E.g., Monthly savings contribution" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full">Review Transfer</Button>
              <p className="text-xs text-muted-foreground text-center">
                Transfers between your accounts are typically instant. Review all details before confirming.
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <Dialog open={isConfirming} onOpenChange={(open) => !isSubmitting && setIsConfirming(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Transfer</DialogTitle>
            <DialogDescription>
              Please review the details below before submitting your transfer. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {confirmationData && (
            <div className="space-y-4 py-4">
              <DetailRow label="Transfer Type" value="Internal Transfer" />
              <DetailRow label="From Account" value={fromAccountName} />
              <DetailRow label="To Account" value={toAccountName} />
              <DetailRow label="Amount" value={<span className="text-lg font-bold text-primary">${confirmationData.amount.toFixed(2)}</span>} />
              <DetailRow label="Transfer Date" value={format(new Date(), "MMMM d, yyyy")} />
              {confirmationData.memo && <DetailRow label="Memo" value={confirmationData.memo} />}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirming(false)} disabled={isSubmitting}>Edit</Button>
            <Button onClick={handleConfirmTransfer} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm & Submit"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
