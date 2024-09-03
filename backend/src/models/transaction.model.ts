import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}

const TransactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    type: { type: String },
    date: { type: Date, default: Date.now },
    isRecurrent: { type: Boolean, default: false },
});

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);