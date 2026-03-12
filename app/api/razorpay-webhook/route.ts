// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import connectDB from "@/app/lib/mongodb";
// import Contribution from "@/app/lib/models/Contribution";
// 
// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.text();
//         const signature = req.headers.get("x-razorpay-signature");
// 
//         if (!signature) {
//             return NextResponse.json(
//                 { error: "Missing signature" },
//                 { status: 400 }
//             );
//         }
// 
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
//             .update(body)
//             .digest("hex");
// 
//         if (expectedSignature !== signature) {
//             console.error("Razorpay webhook signature mismatch");
//             return NextResponse.json(
//                 { error: "Invalid signature" },
//                 { status: 401 }
//             );
//         }
// 
//         const payload = JSON.parse(body);
//         const event = payload.event;
// 
//         await connectDB();
// 
//         if (event === "payment.captured") {
//             const payment = payload.payload.payment.entity;
//             const orderId = payment.order_id;
// 
//             console.log(
//                 `[Webhook] payment.captured — Payment: ${payment.id}, Order: ${orderId}`
//             );
// 
//             await Contribution.findOneAndUpdate(
//                 { razorpayOrderId: orderId },
//                 {
//                     razorpayPaymentId: payment.id,
//                     status: "paid",
//                 }
//             );
//         } else if (event === "payment.failed") {
//             const payment = payload.payload.payment.entity;
//             const orderId = payment.order_id;
// 
//             console.log(
//                 `[Webhook] payment.failed — Payment: ${payment.id}, Order: ${orderId}, Reason: ${payment.error_description}`
//             );
// 
//             await Contribution.findOneAndUpdate(
//                 { razorpayOrderId: orderId },
//                 { status: "failed" }
//             );
//         }
// 
//         return NextResponse.json({ status: "ok" });
//     } catch (error) {
//         console.error("Webhook error:", error);
//         return NextResponse.json(
//             { error: "Webhook processing error" },
//             { status: 500 }
//         );
//     }
// }
// 

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ error: "Not Implemented" }, { status: 501 });
}

export async function POST() {
    return NextResponse.json({ error: "Not Implemented" }, { status: 501 });
}
