import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
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


const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    username: { type: String, required: true, unique: true },

    // Financial data:
    defaultCurrency: { type: String, default: "USD" },
    currentBalance: { type: Number, default: 0 },
    monthlyIncome: { type: Number, default: 0 },
    currentMonthSpending: { type: Number, default: 0 },
    currentMonthBudget: { type: Number, default: 0 },
    currentMonthRemainingBudget: { type: Number, default: 0 },
    currentMonthUpcomingSpending: { type: Number, default: 0 },

    categories: [{ type: String }],
    savingGoals: [{
        name: { type: String, required: true },
        targetAmount: { type: Number, required: true },
        currentAmount: { type: Number, default: 0 },
        dueDate: { type: Date, required: true }
    }]
});

export const User = mongoose.model<IUser>("User", UserSchema);