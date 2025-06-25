
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundsTransferForm } from "@/components/dashboard/funds-transfer-form";
import { ExternalTransferForm } from "@/components/dashboard/external-transfer-form";
import { ZelleTransferForm } from "@/components/dashboard/zelle-transfer-form";
import { ArrowRightLeft, Landmark, Zap, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function TransferPage() {
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Money Transfer</h1>
        <p className="text-muted-foreground">
          Securely transfer funds between your accounts, to external banks, or using Zelle®.
        </p>
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
          <AlertTitle className="font-bold text-lg">⚠️ Account Notice</AlertTitle>
          <AlertDescription>
            Due to multiple transaction errors, certain features on your account have been temporarily restricted to protect your security. Please visit your nearest VaultbyChase branch to resolve this issue.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="internal" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
          <TabsTrigger value="internal" className="py-2.5">
            <ArrowRightLeft className="mr-2 h-5 w-5" />
            Internal Transfer
          </TabsTrigger>
          <TabsTrigger value="external-ach" className="py-2.5">
            <Landmark className="mr-2 h-5 w-5" />
            External (ACH)
          </TabsTrigger>
          <TabsTrigger value="zelle" className="py-2.5">
            <Zap className="mr-2 h-5 w-5" />
            Zelle®
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internal" className="mt-6">
          <FundsTransferForm />
        </TabsContent>

        <TabsContent value="external-ach" className="mt-6">
          <ExternalTransferForm />
        </TabsContent>

        <TabsContent value="zelle" className="mt-6">
          <ZelleTransferForm />
        </TabsContent>
      </Tabs>

      {/* 
      Future: Consider adding a consolidated transfer history section here, 
      potentially as another tab or a separate component below the forms.
      This history would combine internal, ACH, and Zelle transactions.
      */}
    </div>
  );
}
