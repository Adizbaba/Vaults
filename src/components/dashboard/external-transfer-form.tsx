
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Landmark, Loader2, DollarSign, BookUser, University, Hash } from "lucide-react";
import { handleAchTransfer } from "@/app/dashboard/transfer/actions"; // Placeholder server action

const externalTransferSchema = z.object({
  fromAccount: z.string().min(1, "Please select your account."),
  bankName: z.string().min(2, "Bank name is required."),
  routingNumber: z.string().length(9, "Routing number must be 9 digits.").regex(/^\d+$/, "Routing number must be numeric."),
  accountNumber: z.string().min(4, "Account number is required.").max(17, "Account number is too long.").regex(/^\d+$/, "Account number must be numeric."),
  accountType: z.enum(["checking", "savings"], { required_error: "Account type is required." }),
  amount: z.coerce.number().positive("Amount must be positive.").min(0.01, "Amount must be at least $0.01."),
  memo: z.string().optional(),
});

type ExternalTransferFormValues = z.infer<typeof externalTransferSchema>;

// Mock user accounts (should ideally come from a context or API)
const userAccounts = [
  { id: "checking123", name: "Primary Checking (•••• 1234)", balance: 5210.75 },
  { id: "savings5678", name: "High-Yield Savings (•••• 5678)", balance: 15830.20 },
];

export function ExternalTransferForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExternalTransferFormValues>({
    resolver: zodResolver(externalTransferSchema),
    defaultValues: {
      fromAccount: "",
      bankName: "",
      routingNumber: "",
      accountNumber: "",
      amount: 0,
      memo: "",
    },
  });

  const onSubmit = async (data: ExternalTransferFormValues) => {
    setIsLoading(true);
    console.log("External ACH Transfer data:", data);
    
    try {
      const result = await handleAchTransfer(data);
      if (result.success) {
        toast({
          title: "ACH Transfer Initiated",
          description: result.message || `Transfer of $${data.amount.toFixed(2)} to ${data.bankName} (••••${data.accountNumber.slice(-4)}) is processing. It may take 1-3 business days.`,
          variant: "default",
        });
        form.reset();
      } else {
        toast({
          title: "ACH Transfer Failed",
          description: result.error || "Could not initiate the transfer. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("ACH Transfer submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Landmark className="h-7 w-7 text-primary" />
          <CardTitle className="text-2xl text-primary">External Bank Transfer (ACH)</CardTitle>
        </div>
        <CardDescription>Send money to an account at another bank. Standard ACH processing times apply (1-3 business days).</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="fromAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Your Account</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your VaultbyChase account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.name} - Bal: ${acc.balance.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2 border-t pt-4">
                <h3 className="text-md font-medium text-muted-foreground">Recipient's Bank Account Details</h3>
            </div>

            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center"><BookUser className="mr-2 h-4 w-4 text-muted-foreground" />Recipient Bank Name</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Bank of America" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="routingNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center"><University className="mr-2 h-4 w-4 text-muted-foreground" />Routing Number</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="9 digits" {...field} maxLength={9} disabled={isLoading}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel className="flex items-center"><Hash className="mr-2 h-4 w-4 text-muted-foreground" />Account Number</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter account number" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Account Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isLoading}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
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
                  <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Amount to Transfer</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span>
                      <Input type="number" placeholder="0.00" {...field} className="pl-7" step="0.01" disabled={isLoading} />
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
                    <Textarea placeholder="E.g., Payment for services" {...field} disabled={isLoading}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initiating Transfer...
                </>
              ) : (
                "Review & Initiate ACH Transfer"
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center px-2">
              By submitting, you authorize VaultbyChase to debit your selected account and credit the recipient account according to the details provided. Ensure all information is accurate.
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
