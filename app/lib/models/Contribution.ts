import mongoose, { Schema, Document } from "mongoose";

export interface IContribution extends Document {
    name: string;
    yearOfPassing: number;
    amount: number;
    razorpayOrderId: string;
    razorpayPaymentId?: string;
    razorpaySignature?: string;
    status: "created" | "paid" | "failed";
    createdAt: Date;
}

const ContributionSchema = new Schema<IContribution>(
    {
        name: { type: String, required: true },
        yearOfPassing: { type: Number, required: true },
        amount: { type: Number, required: true },
        razorpayOrderId: { type: String, required: true },
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        status: {
            type: String,
            enum: ["created", "paid", "failed"],
            default: "created",
        },
    },
    { timestamps: true }
);

export default mongoose.models.Contribution ||
    mongoose.model<IContribution>("Contribution", ContributionSchema);
