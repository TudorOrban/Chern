import { injectable } from "inversify";
import { IUser } from "../models/user.model";
import { UpdateUserDTO, UserDetailsDTO } from "../DTOs/user.dto";

export interface DTOMapperService {
    mapUserToUserDetails(user: IUser | null): UserDetailsDTO | null;
    mapUserToUpdateUserDTO(user: IUser): UpdateUserDTO;
}

@injectable()
export class DTOMapperServiceImpl implements DTOMapperService {

    
    mapUserToUserDetails(user: IUser | null): UserDetailsDTO | null {
        if (!user) return null;

        return {
            id: user.id,
            email: user.email,
            username: user.username,
            passwordHash: user?.passwordHash,

            // Financial data:
            defaultCurrency: user?.defaultCurrency,
            currentBalance: user?.currentBalance,
            monthlyIncome: user?.monthlyIncome,
            currentMonthSpending: user?.currentMonthSpending,
            currentMonthBudget: user?.currentMonthBudget,
            currentMonthRemainingBudget: user?.currentMonthRemainingBudget,
            currentMonthUpcomingSpending: user?.currentMonthUpcomingSpending,
            balanceHistory: user?.balanceHistory,

            categories: user?.categories,
            savingGoals: user?.savingGoals,

            userSettings: user?.userSettings
        };
    }

    mapUserToUpdateUserDTO(user: IUser): UpdateUserDTO {
        const userDTO: UpdateUserDTO = {
            id: user.id,
            email: user.email,
            username: user.username,

            // Financial data:
            defaultCurrency: user.defaultCurrency,
            currentBalance: user.currentBalance,
            monthlyIncome: user.monthlyIncome,
            currentMonthSpending: user.currentMonthSpending,
            currentMonthBudget: user.currentMonthBudget,
            currentMonthRemainingBudget: user.currentMonthRemainingBudget,
            currentMonthUpcomingSpending: user.currentMonthUpcomingSpending,
            balanceHistory: user.balanceHistory,

            categories: user.categories,
            savingGoals: user.savingGoals,

            userSettings: user.userSettings
        };

        return userDTO;
    }
}