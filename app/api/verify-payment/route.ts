// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import connectDB from "@/app/lib/mongodb";
// import Contribution from "@/app/lib/models/Contribution";
// 
// export async function POST(req: NextRequest) {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//         } = await req.json();
// 
//         if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//             return NextResponse.json(
//                 { error: "Missing payment verification details" },
//                 { status: 400 }
//             );
//         }
// 
//         // Verify the signature
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//             .update(body)
//             .digest("hex");
// 
//         const isValid = expectedSignature === razorpay_signature;
// 
//         await connectDB();
// 
//         if (isValid) {
//             await Contribution.findOneAndUpdate(
//                 { razorpayOrderId: razorpay_order_id },
//                 {
//                     razorpayPaymentId: razorpay_payment_id,
//                     razorpaySignature: razorpay_signature,
//                     status: "paid",
//                 }
//             );
// 
//             return NextResponse.json(
//                 { success: true, message: "Payment verified successfully" },
//                 { status: 200 }
//             );
//         } else {
//             await Contribution.findOneAndUpdate(
//                 { razorpayOrderId: razorpay_order_id },
//                 { status: "failed" }
//             );
// 
//             return NextResponse.json(
//                 { success: false, error: "Invalid payment signature" },
//                 { status: 400 }
//             );
//         }
//     } catch (error) {
//         console.error("Error verifying payment:", error);
//         return NextResponse.json(
//             { error: "Payment verification failed" },
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
