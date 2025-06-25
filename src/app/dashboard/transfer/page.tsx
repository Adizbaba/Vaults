
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FundsTransferForm } from "@/components/dashboard/funds-transfer-form";
import { ExternalTransferForm } from "@/components/dashboard/external-transfer-form";
import { ZelleTransferForm } from "@/components/dashboard/zelle-transfer-form";
import { ArrowRightLeft, Landmark, Zap, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type TransferType = "internal" | "external-ach" | "zelle";

export default function TransferPage() {
  const [isAlertVisible, setIsAlertVisible] = useState(true);
  const [activeTransferType, setActiveTransferType] = useState<TransferType>("internal");

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
          <AlertTitle className="font-bold text-lg">Account Notice</AlertTitle>
          <AlertDescription>
          Due to multiple errors detected during recent money transfer attempts, your ability to initiate new transfers has been temporarily restricted as a security precaution. Please visit your nearest VaultbyChase branch to resolve this issue and restore full access to your account.
          </AlertDescription>
        </Alert>
      )}

      {/* Mobile Dropdown Selector */}
      <div className="sm:hidden space-y-2">
        <Label htmlFor="transfer-type-select">Select Transfer Type</Label>
        <Select value={activeTransferType} onValueChange={(value) => setActiveTransferType(value as TransferType)}>
          <SelectTrigger id="transfer-type-select">
            <SelectValue placeholder="Select transfer type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internal">
                <div className="flex items-center gap-2">
                    <ArrowRightLeft className="h-5 w-5" /> Internal Transfer
                </div>
            </SelectItem>
            <SelectItem value="external-ach">
                <div className="flex items-center gap-2">
                    <Landmark className="h-5 w-5" /> External (ACH)
                </div>
            </SelectItem>
            <SelectItem value="zelle">
                <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" /> Zelle®
                </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Tabs Selector */}
      <div className="hidden sm:block">
        <Tabs value={activeTransferType} onValueChange={(value) => setActiveTransferType(value as TransferType)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="internal">
              <ArrowRightLeft className="mr-2 h-5 w-5" />
              Internal Transfer
            </TabsTrigger>
            <TabsTrigger value="external-ach">
              <Landmark className="mr-2 h-5 w-5" />
              External (ACH)
            </TabsTrigger>
            <TabsTrigger value="zelle">
              <Zap className="mr-2 h-5 w-5" />
              Zelle®
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTransferType === 'internal' && <FundsTransferForm />}
        {activeTransferType === 'external-ach' && <ExternalTransferForm />}
        {activeTransferType === 'zelle' && <ZelleTransferForm />}
      </div>
      
    </div>
  );
}
