import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "@/app/lib/mongodb";
import Contribution from "@/app/lib/models/Contribution";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: NextRequest) {
    try {
        const { name, yearOfPassing, amount } = await req.json();

        if (!name || !yearOfPassing || !amount) {
            return NextResponse.json(
                { error: "Name, year of passing, and amount are required" },
                { status: 400 }
            );
        }

        if (amount < 1) {
            return NextResponse.json(
                { error: "Amount must be at least ₹1" },
                { status: 400 }
            );
        }

        await connectDB();

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100),
            currency: "INR",
            receipt: `contrib_${Date.now()}`,
            notes: {
                contributor_name: name,
                year_of_passing: String(yearOfPassing),
                amount_inr: String(amount),
                purpose: "Binary KGEC Hackathon 2026 Contribution",
                event: "Binary - KGEC Hackathon 2026",
                collected_at: new Date().toISOString(),
            },
        });

        await Contribution.create({
            name,
            yearOfPassing,
            amount,
            razorpayOrderId: order.id,
            status: "created",
        });

        return NextResponse.json({ orderId: order.id }, { status: 200 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
