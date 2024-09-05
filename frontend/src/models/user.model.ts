
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    username: string;
    
    // Financial data:
    defaultCurrency?: string;
    currentBalance?: number;
    monthlyIncome?: number;
    currentMonthSpending?: number;
    currentMonthBudget?: number;
    currentMonthRemainingBudget?: number;
    currentMonthUpcomingSpending?: number;
    balanceHistory?: DateBalance[];

    categories?: string[];
    savingGoals?: SavingGoal[];

    userSettings?: UserSettings;
}

export interface DateBalance {
    date: Date;
    balance: number;
}

export interface SavingGoal {
    name: string;
    targetAmount: number;
    currentAmount: number;
    category?: string;
    dueDate: Date;
}

export interface UserSettings {
    transactionAlertThreshold: number;
    budgetLimitAlert: boolean;
}
