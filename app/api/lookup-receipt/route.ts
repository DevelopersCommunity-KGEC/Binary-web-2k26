// import { NextRequest, NextResponse } from "next/server";
// import connectDB from "@/app/lib/mongodb";
// import Contribution from "@/app/lib/models/Contribution";
// 
// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const name = searchParams.get("name")?.trim();
// 
//         if (!name || name.length < 2) {
//             return NextResponse.json(
//                 { error: "Please enter at least 2 characters" },
//                 { status: 400 }
//             );
//         }
// 
//         await connectDB();
// 
//         const contributions = await Contribution.find({
//             name: { $regex: name, $options: "i" },
//             status: "paid",
//         })
//             .select("name yearOfPassing amount razorpayOrderId createdAt")
//             .sort({ createdAt: -1 })
//             .limit(10)
//             .lean();
// 
//         return NextResponse.json({ results: contributions }, { status: 200 });
//     } catch (error) {
//         console.error("Error looking up receipts:", error);
//         return NextResponse.json(
//             { error: "Failed to look up receipts" },
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
