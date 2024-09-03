import mongoose from "mongoose";

export interface TransactionDetailsDTO {
    id: string;
    userId: mongoose.Types.ObjectId;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}

export interface CreateTransactionDTO {
    userId: mongoose.Types.ObjectId;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}

export interface UpdateTransactionDTO {
    id: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}