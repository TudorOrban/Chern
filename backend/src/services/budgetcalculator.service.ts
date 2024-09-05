import { inject, injectable } from "inversify";
import { UserDetailsDTO } from "../DTOs/user.dto";
import TYPES from "../config/types";
import { UserRepository } from "../repositories/user.repository";
import { TransactionRepository } from "../repositories/transaction.repository";

export interface BudgetCalculatorService {
    calculateFinancialData(userId: string): Promise<UserDetailsDTO | null>;
}

@injectable()
export class BudgetCalculatorServiceImpl implements BudgetCalculatorService {
    
    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.TransactionRepository) private transactionRepository: TransactionRepository
    ) {}
    
    async calculateFinancialData(userId: string): Promise<UserDetailsDTO | null> {
        const user = await this.userRepository.findUserById(userId);
        if (!user){
            return null;
        }

        const userTransactions = await this.transactionRepository.findTransactionsByUserId(userId);

        let currentMonthSpending = 0;

        const userExpenses = userTransactions.filter(transaction => transaction.type === 'Expense');

        const currentMonthExpenses = userExpenses.filter(transaction => {
            const transactionDate = new Date(transaction.date ?? new Date());
            const currentDate = new Date();

            return transactionDate.getMonth() === currentDate.getMonth() && transactionDate.getFullYear() === currentDate.getFullYear();
        });

        currentMonthSpending = currentMonthExpenses.reduce((acc, transaction) => acc + transaction.amount, 0);

        user.currentMonthSpending = currentMonthSpending;
        user.currentMonthBudget = (user?.currentMonthBudget ?? 0) - currentMonthSpending;

        const currentMonthUpcomingExpenses = userExpenses.filter(transaction => {
            const transactionDate = new Date(transaction.date ?? new Date());
            const currentDate = new Date();

            return transactionDate.getMonth() === currentDate.getMonth() + 1 && transactionDate.getFullYear() === currentDate.getFullYear();
        });

        user.currentMonthUpcomingSpending = currentMonthUpcomingExpenses.reduce((acc, transaction) => acc + transaction.amount, 0);

        this.userRepository.updateUser(user);


        return user;
    }
}