import { DateBalance, SavingGoal, UserSettings } from "@/models/user.model";

export interface UserDetailsDTO {
    id: number;
    email: string;
    username: string;
    passwordHash?: string;

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

export interface CreateUserDTO {
    email: string;
    password: string;
    username: string;
    passwordHash?: string;
}

export interface UpdateUserDTO {
    id: number;
    email?: string;
    password?: string;
    username?: string;
    
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