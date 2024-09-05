export interface TransactionDetailsDTO {
    id: string;
    userId: string;
    amount: number;
    type?: "Income" | "Expense";
    category?: string;
    date?: Date;
    isRecurrent?: boolean;

    // UI types:
    isSelected?: boolean;
    isEditing?: boolean;
}

export interface CreateTransactionDTO {
    userId: string;
    amount: number;
    type?: "Income" | "Expense";
    category?: string;
    date?: Date;
    isRecurrent?: boolean;

    // UI types:
    temporaryId?: string;
    isSelected?: boolean;
    isEditing?: boolean;
}

export interface UpdateTransactionDTO {
    id: string;
    amount: number;
    type?: "Income" | "Expense";
    category?: string;
    date?: Date;
    isRecurrent?: boolean;
    
    // UI types:
    isEditing?: boolean;
}