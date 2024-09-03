import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    user?: IUser;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}

const TransactionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
    type: { type: String },
    date: { type: Date, default: Date.now },
    isRecurrent: { type: Boolean, default: false },
});

TransactionSchema.index({ userId: 1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);