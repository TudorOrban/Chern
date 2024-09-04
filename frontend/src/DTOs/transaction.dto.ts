export interface TransactionDetailsDTO {
    id: string;
    userId: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
    isSelected?: boolean;
}

export interface CreateTransactionDTO {
    userId: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;

    // UI types:
    temporaryId?: string;
    isSelected?: boolean;
}

export interface UpdateTransactionDTO {
    id: string;
    amount: number;
    type?: string;
    date?: Date;
    isRecurrent?: boolean;
}