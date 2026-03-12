import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import Contribution from "@/app/lib/models/Contribution";
import { generateInvoiceHTML } from "@/app/lib/invoiceTemplate";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const contribution = await Contribution.findOne({
      razorpayOrderId: orderId,
      status: "paid",
    });

    if (!contribution) {
      return NextResponse.json(
        { error: "Paid contribution not found" },
        { status: 404 }
      );
    }

    const invoiceDate = new Date(contribution.createdAt).toLocaleDateString(
      "en-IN",
      { year: "numeric", month: "long", day: "numeric" }
    );

    const invoiceNumber = `BIN-${contribution.createdAt.getFullYear()}-${contribution._id.toString().slice(-6).toUpperCase()}`;

    // Derive base URL from the request
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const host = req.headers.get("host") || "localhost:3000";
    const siteUrl = `${protocol}://${host}`;

    const html = generateInvoiceHTML({
      contribution,
      invoiceNumber,
      invoiceDate,
      siteUrl,
    });

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `inline; filename="invoice-${invoiceNumber}.html"`,
      },
    });
  } catch (error) {
    console.error("Error generating invoice:", error);
    return NextResponse.json(
      { error: "Failed to generate invoice" },
      { status: 500 }
    );
  }
}
