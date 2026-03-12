import { NextRequest, NextResponse } from "next/server";
import { generateInvoiceHTML } from "@/app/lib/invoiceTemplate";

// Temporary preview route — DELETE after finalizing the invoice template
export async function GET(req: NextRequest) {
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const siteUrl = `${protocol}://${host}`;

    const mockContribution = {
        name: "Sayan Chatterjee",
        yearOfPassing: 2026,
        amount: 500,
        razorpayOrderId: "order_SAMPLE123456",
        razorpayPaymentId: "pay_SAMPLE789012",
        razorpaySignature: "sig_sample",
        status: "paid" as const,
        createdAt: new Date(),
        _id: { toString: () => "abc123def456" },
    };

    const html = generateInvoiceHTML({
        contribution: mockContribution as never,
        invoiceNumber: "BIN-2026-DEF456",
        invoiceDate: "6 March 2026",
        siteUrl,
    });

    return new NextResponse(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
    });
}
