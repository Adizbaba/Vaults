
"use server";

import { z } from "zod";

// --- ACH Transfer ---
const externalTransferSchema = z.object({
  fromAccount: z.string(),
  bankName: z.string(),
  routingNumber: z.string(),
  accountNumber: z.string(),
  accountType: z.enum(["checking", "savings"]),
  amount: z.number(),
  memo: z.string().optional(),
});

type ExternalTransferFormValues = z.infer<typeof externalTransferSchema>;

interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

export async function handleAchTransfer(
  data: ExternalTransferFormValues
): Promise<ActionResult> {
  console.log("Server Action: handleAchTransfer called with data:", data);

  // Simulate backend processing & validation
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  
  // Force failure for demonstration purposes as requested.
  return { success: false, error: "Your transfer could not be completed at this time. Please try again later." };
}


// --- Zelle Transfer ---

interface ZelleRecipient {
  identifier: string; // email or phone
  name: string;
  isRegistered: boolean;
}

interface ZelleSearchSuccessResult {
  success: true;
  recipient: ZelleRecipient;
}
interface ZelleSearchErrorResult {
  success: false;
  error: string;
  recipient?: null;
}
type ZelleSearchResult = ZelleSearchSuccessResult | ZelleSearchErrorResult;


export async function searchZelleRecipient(identifier: string): Promise<ZelleSearchResult> {
  console.log("Server Action: searchZelleRecipient called with identifier:", identifier);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Mocked recipient data
  const mockRecipients: Record<string, ZelleRecipient> = {
    "user@example.com": { identifier: "user@example.com", name: "Jane Doe (Example)", isRegistered: true },
    "1234567890": { identifier: "1234567890", name: "John Smith (Example)", isRegistered: true },
    "unregistered@example.com": { identifier: "unregistered@example.com", name: "Alex Ray (Unregistered)", isRegistered: false },
  };

  const found = mockRecipients[identifier.toLowerCase()];

  if (found) {
    return { success: true, recipient: found };
  } else if (identifier.includes("testfound")) { // For testing UI a found but unregistered user
     return { success: true, recipient: { identifier: identifier, name: "Test User Found", isRegistered: Math.random() > 0.3 } };
  }
  
  return { success: false, error: "Recipient not found or not enrolled with Zelle® using this contact information." };
}


const zelleSendSchemaServer = z.object({
  fromAccount: z.string(),
  recipientIdentifier: z.string(),
  recipientName: z.string(),
  amount: z.number(),
  memo: z.string().optional(),
});
type ZelleSendFormValuesServer = z.infer<typeof zelleSendSchemaServer>;

export async function handleZelleSendMoney(data: ZelleSendFormValuesServer): Promise<ActionResult> {
  console.log("Server Action: handleZelleSendMoney called with data:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Force failure for demonstration purposes as requested.
  return { success: false, error: "Your Zelle® transfer could not be completed at this time. Please try again later." };
}

const zelleRequestSchemaServer = z.object({
  recipientIdentifier: z.string(),
  recipientName: z.string(),
  amount: z.number(),
  memo: z.string().optional(),
});
type ZelleRequestFormValuesServer = z.infer<typeof zelleRequestSchemaServer>;

export async function handleZelleRequestMoney(data: ZelleRequestFormValuesServer): Promise<ActionResult> {
  console.log("Server Action: handleZelleRequestMoney called with data:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Force failure for demonstration purposes as requested.
  return { success: false, error: "Your Zelle® request could not be completed at this time. Please try again later." };
}
