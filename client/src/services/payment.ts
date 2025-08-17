import { apiRequest } from "@/lib/queryClient";

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message?: string;
}

export async function processProtocolPayment(
  protocol: string,
  userId: string,
  amount: string
): Promise<PaymentResult> {
  try {
    const response = await apiRequest("POST", "/api/protocol/join", {
      protocol,
      userId,
      amount,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Payment processing error:", error);
    return {
      success: false,
      message: "Payment processing failed. Please try again.",
    };
  }
}

export async function generateReferralLink(userId: string): Promise<string | null> {
  try {
    const response = await apiRequest("POST", "/api/referral/generate", { userId });
    const result = await response.json();
    return result.referralLink;
  } catch (error) {
    console.error("Referral link generation error:", error);
    return null;
  }
}
