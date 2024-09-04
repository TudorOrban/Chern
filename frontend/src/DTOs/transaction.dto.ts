export interface TransactionDetailsDTO {
    id: string;
    userId: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}

export interface CreateTransactionDTO {
    userId: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;

    // UI types:
    temporaryId?: string;
}

export interface UpdateTransactionDTO {
    id: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}