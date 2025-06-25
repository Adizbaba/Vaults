
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Zap, Users, Search, Loader2, DollarSign, Send, UserPlus } from "lucide-react";
import { handleZelleSendMoney, handleZelleRequestMoney, searchZelleRecipient } from "@/app/dashboard/transfer/actions";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

const zelleRecipientSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required."),
});

const zelleTransferSchemaBase = z.object({
  fromAccount: z.string(),
  recipientIdentifier: z.string().min(1, "Recipient email or phone is required."),
  recipientName: z.string().min(1, "Recipient name is required."),
  amount: z.coerce.number().positive("Amount must be positive.").min(0.01, "Amount must be at least $0.01."),
  memo: z.string().optional(),
});

const zelleSendSchema = zelleTransferSchemaBase.extend({
  fromAccount: z.string().min(1, "Please select your account."),
});
const zelleRequestSchema = zelleTransferSchemaBase.omit({ fromAccount: true });

type ZelleRecipientSearchValues = z.infer<typeof zelleRecipientSchema>;
type ZelleSendFormValues = z.infer<typeof zelleSendSchema>;
type ZelleRequestFormValues = z.infer<typeof zelleRequestSchema>;

const userAccounts = [
  { id: "checking123", name: "Primary Checking (•••• 1234)", balance: 5210.75 },
  { id: "savings5678", name: "High-Yield Savings (•••• 5678)", balance: 15830.20 },
];

interface ZelleRecipient {
  identifier: string;
  name: string;
  isRegistered: boolean;
}

const DetailRow = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex justify-between items-center py-2 border-b border-dashed">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="text-sm font-medium text-foreground text-right">{value}</div>
    </div>
);

type ConfirmationData = {
    type: 'send' | 'request';
    data: ZelleSendFormValues | ZelleRequestFormValues;
}

export function ZelleTransferForm() {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState<"send" | "request">("send");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [foundRecipient, setFoundRecipient] = useState<ZelleRecipient | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);

  const recipientSearchForm = useForm<ZelleRecipientSearchValues>({ resolver: zodResolver(zelleRecipientSchema), defaultValues: { identifier: "" } });
  const sendForm = useForm<ZelleSendFormValues>({ resolver: zodResolver(zelleSendSchema), defaultValues: { fromAccount: "", recipientIdentifier: "", recipientName: "", amount: 0, memo: "" } });
  const requestForm = useForm<ZelleRequestFormValues>({ resolver: zodResolver(zelleRequestSchema), defaultValues: { recipientIdentifier: "", recipientName: "", amount: 0, memo: "" } });

  const handleRecipientSearch = async (data: ZelleRecipientSearchValues) => {
    setIsSearching(true);
    setFoundRecipient(null);
    setSearchError(null);
    sendForm.reset();
    requestForm.reset();

    try {
      const result = await searchZelleRecipient(data.identifier);
      if (result.success && result.recipient) {
        setFoundRecipient(result.recipient);
        sendForm.setValue("recipientIdentifier", result.recipient.identifier);
        sendForm.setValue("recipientName", result.recipient.name);
        requestForm.setValue("recipientIdentifier", result.recipient.identifier);
        requestForm.setValue("recipientName", result.recipient.name);
        if (!result.recipient.isRegistered) {
          toast({
            title: "Recipient Not Fully Registered with Zelle®",
            description: `${result.recipient.name} does not use Zelle® with this contact. They will receive an invitation to enroll to complete the transfer.`,
            duration: 8000,
          });
        }
      } else {
        setSearchError(result.error || "Recipient not found.");
      }
    } catch (error) {
      setSearchError("An error occurred during search.");
    } finally {
      setIsSearching(false);
    }
  };

  const onSendSubmit = (data: ZelleSendFormValues) => {
    setConfirmationData({ type: 'send', data });
    setIsConfirming(true);
  };

  const onRequestSubmit = (data: ZelleRequestFormValues) => {
    setConfirmationData({ type: 'request', data });
    setIsConfirming(true);
  };

  const handleConfirmZelle = async () => {
    if (!confirmationData) return;
    setIsSubmitting(true);
    
    try {
      const result = confirmationData.type === 'send'
        ? await handleZelleSendMoney(confirmationData.data as ZelleSendFormValues)
        : await handleZelleRequestMoney(confirmationData.data as ZelleRequestFormValues);

      if (result.success) {
        toast({ title: `Zelle® ${confirmationData.type === 'send' ? 'Payment Sent' : 'Request Sent'}`, description: result.message });
        sendForm.reset();
        requestForm.reset();
        recipientSearchForm.reset();
        setFoundRecipient(null);
      } else {
        const actionType = confirmationData.type === 'send' ? 'Transfer' : 'Request';
        toast({ 
            title: `${actionType} Unsuccessful`,
            description: result.error || `Your Zelle® ${actionType.toLowerCase()} could not be completed at this time. Please try again later.`,
            variant: "destructive" 
        });
      }
    } catch (error) {
       toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
      setIsConfirming(false);
      setConfirmationData(null);
    }
  };
  
  const currentActiveForm = currentTab === "send" ? sendForm : requestForm;
  const fromAccountName = confirmationData?.type === 'send' 
    ? userAccounts.find(acc => acc.id === (confirmationData.data as ZelleSendFormValues).fromAccount)?.name
    : 'N/A';

  return (
    <>
      <Card className="w-full max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-7 w-7 text-primary" />
            <CardTitle className="text-2xl text-primary">Send & Request Money with Zelle®</CardTitle>
          </div>
          <CardDescription>Quickly send or request money from friends and family using their email or U.S. mobile number.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...recipientSearchForm}>
            <form onSubmit={recipientSearchForm.handleSubmit(handleRecipientSearch)} className="space-y-4 mb-6 p-4 border rounded-md bg-muted/50">
              <FormField
                control={recipientSearchForm.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center"><Users className="mr-2 h-4 w-4 text-muted-foreground"/>Find Recipient</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Email or U.S. mobile number" {...field} disabled={isSearching || isSubmitting} />
                      </FormControl>
                      <Button type="submit" disabled={isSearching || isSubmitting || !field.value}>
                        {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                      </Button>
                    </div>
                    <FormMessage />
                    {searchError && <p className="text-sm font-medium text-destructive">{searchError}</p>}
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {foundRecipient && (
            <div className="mb-6 p-4 border border-green-500 bg-green-50 dark:bg-green-900/30 rounded-md">
              <p className="text-sm font-medium text-green-700 dark:text-green-300">
                Recipient Found: <span className="font-bold">{foundRecipient.name}</span> ({foundRecipient.identifier})
              </p>
            </div>
          )}

          <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as "send" | "request")} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send" disabled={isSubmitting}><Send className="mr-2 h-4 w-4"/> Send Money</TabsTrigger>
              <TabsTrigger value="request" disabled={isSubmitting}><UserPlus className="mr-2 h-4 w-4"/> Request Money</TabsTrigger>
            </TabsList>
            
            <Form {...(currentActiveForm as any)}>
              <form onSubmit={currentTab === "send" ? sendForm.handleSubmit(onSendSubmit) : requestForm.handleSubmit(onRequestSubmit)}>
                <TabsContent value="send" className="pt-6 space-y-6">
                  <FormField control={sendForm.control} name="fromAccount" render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Your Account</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting || !foundRecipient}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select your VaultbyChase account" /></SelectTrigger></FormControl>
                          <SelectContent>{userAccounts.map(acc => (<SelectItem key={acc.id} value={acc.id}>{acc.name} - Bal: ${acc.balance.toFixed(2)}</SelectItem>))}</SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={sendForm.control} name="amount" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Amount to Send</FormLabel>
                        <FormControl><div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span><Input type="number" placeholder="0.00" {...field} className="pl-7" step="0.01" disabled={isSubmitting || !foundRecipient}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={sendForm.control} name="memo" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Memo (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="E.g., For dinner last night" {...field} disabled={isSubmitting || !foundRecipient} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="request" className="pt-6 space-y-6">
                   <FormField control={requestForm.control} name="amount" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />Amount to Request</FormLabel>
                        <FormControl><div className="relative"><span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span><Input type="number" placeholder="0.00" {...field} className="pl-7" step="0.01" disabled={isSubmitting || !foundRecipient}/></div></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField control={requestForm.control} name="memo" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Memo (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="E.g., Pizza money" {...field} disabled={isSubmitting || !foundRecipient}/></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <CardFooter className="mt-6 px-0 pb-0">
                  <Button type="submit" className="w-full" disabled={isSubmitting || !foundRecipient || !currentActiveForm.formState.isValid}>
                    {currentTab === "send" ? "Review & Send" : "Review & Request"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Tabs>
        </CardContent>
          <p className="text-xs text-muted-foreground text-center p-4">
              Zelle® and the Zelle® related marks are wholly owned by Early Warning Services, LLC and are used herein under license.
          </p>
      </Card>

      <Dialog open={isConfirming} onOpenChange={(open) => !isSubmitting && setIsConfirming(open)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Your Zelle® {confirmationData?.type === 'send' ? 'Payment' : 'Request'}</DialogTitle>
            <DialogDescription>
              Please review the details below before submitting.
            </DialogDescription>
          </DialogHeader>
          {confirmationData && (
            <div className="space-y-1 py-4">
              <DetailRow label="Action Type" value={<span className="capitalize">Zelle® {confirmationData.type}</span>} />
              {confirmationData.type === 'send' && <DetailRow label="From Account" value={fromAccountName} />}
              <DetailRow 
                label={confirmationData.type === 'send' ? 'To Recipient' : 'From Recipient'} 
                value={
                  <div>
                    <p>{confirmationData.data.recipientName}</p>
                    <p className="text-xs text-muted-foreground">{confirmationData.data.recipientIdentifier}</p>
                  </div>
                } 
              />
              <DetailRow label="Amount" value={<span className="text-lg font-bold text-primary">${confirmationData.data.amount.toFixed(2)}</span>} />
              <DetailRow label="Date" value={format(new Date(), "MMMM d, yyyy")} />
              {confirmationData.data.memo && <DetailRow label="Memo" value={confirmationData.data.memo} />}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirming(false)} disabled={isSubmitting}>Edit</Button>
            <Button onClick={handleConfirmZelle} disabled={isSubmitting}>
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
