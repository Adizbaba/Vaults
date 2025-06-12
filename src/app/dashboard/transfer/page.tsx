
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FundsTransferForm } from "@/components/dashboard/funds-transfer-form";
import { ExternalTransferForm } from "@/components/dashboard/external-transfer-form";
import { ZelleTransferForm } from "@/components/dashboard/zelle-transfer-form";
import { ArrowRightLeft, Landmark, Zap } from "lucide-react";

export default function TransferPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Money Transfer</h1>
        <p className="text-muted-foreground">
          Securely transfer funds between your accounts, to external banks, or using Zelle®.
        </p>
      </div>

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
