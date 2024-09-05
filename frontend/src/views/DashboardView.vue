<template>
    <div class="page-standard-horizontal-padding py-4 relative">
        <div class="flex items-center justify-between w-full">
            <h1 class="page-title py-4">Dashboard</h1>

            <button
                v-if="isAuthenticated"
                @click="refreshBudget"
                class="flex items-center standard-button"
            >
                <font-awesome-icon icon="arrow-rotate-right" class="w-4 h-4 mr-2"/>
                <span class="label-medium">Refresh Budget</span>
            </button>
        </div>

        <div class="space-y-4">
            <div class="flex items-center space-x-2">
                <span class="label-medium-large">Current Balance: </span>
                <p class="label-medium">
                    {{ formatMoneyAmount(user?.currentBalance, user?.defaultCurrency) }}
                </p>
            </div>
            
            <div class="flex items-center space-x-2">
                <span class="label-medium-large">Monthly Income: </span>
                <p class="label-medium">
                    {{ formatMoneyAmount(user?.monthlyIncome, user?.defaultCurrency) }}
                </p>
            </div>

            <div class="flex items-center space-x-20">
                <div class="flex items-center space-x-2">
                    <span class="label-medium-large">Current Month Spending: </span>
                    <p class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthSpending, user?.defaultCurrency) }}
                    </p>
                </div>
                
                <div class="flex items-center space-x-2">
                    <span class="label-medium-large">Current Month Budget: </span>
                    <p class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthBudget, user?.defaultCurrency) }}
                    </p>
                </div>
            </div>
        </div>
    </div>

    
</template>

<script lang="ts">
import UserService from "@/services/user.service";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class DashboardView extends Vue {
    private userService = new UserService();

    get isAuthenticated(): boolean {
        return !!this.$store.getters.isAuthenticated;
    }

    get user() {
        return this.$store.getters.user;
    }

    formatMoneyAmount(amount: number | null, currency: string = 'USD'): string {
        if (typeof amount === 'number') {
            return `${currency} ${amount.toFixed(2)}`;
        }
        return '-';
    }

    async refreshBudget() {
        if (!this.user) {
            return;
        }

        const user = await this.userService.refreshUserBudget(this.user.id);

        if (user) {
            this.$store.commit('setUser', user);
        }
    }
}
</script>
