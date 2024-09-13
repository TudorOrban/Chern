<template>
    <div class="page-standard-horizontal-padding py-4 relative">
        <div class="flex items-center justify-between w-full py-6">
            <h1 class="page-title">Dashboard</h1>

            <div class="flex items-center space-x-2">
                <button
                    v-if="isAuthenticated"
                    @click="refreshBudget"
                    class="flex items-center standard-button"
                >
                    <font-awesome-icon icon="arrow-rotate-right" class="w-4 h-4 mr-2"/>
                    <span class="label-medium">Refresh</span>
                </button>

                <button
                    v-if="isAuthenticated"
                    @click="editDetails"
                    class="flex items-center standard-write-button"
                >
                    <font-awesome-icon icon="edit" class="w-4 h-4 mr-2"/>
                    <span class="label-medium">Edit</span>
                </button>
            </div>
        </div>

        <div class="space-y-4">
            <div class="flex items-center space-x-2">
                <span class="label-medium-large">Current Balance: </span>
                <span class="label-medium">
                    {{ formatMoneyAmount(user?.currentBalance, user?.defaultCurrency) }}
                </span>
            </div>
            
            <div class="flex items-center space-x-2">
                <span class="label-medium-large">Monthly Income: </span>
                <span class="label-medium">
                    {{ formatMoneyAmount(user?.monthlyIncome, user?.defaultCurrency) }}
                </span>
            </div>

            <div class="flex items-center py-2">
                <h2 class="label-large text-gray-800">Current Month</h2>
            </div>

            <div class="flex items-center space-x-20">
                <div class="flex items-end space-x-2">
                    <span class="label-medium-large">Spending: </span>
                    <span class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthSpending, user?.defaultCurrency) }}
                    </span>
                </div>
                
                <div class="flex items-end space-x-2">
                    <span class="label-medium-large">Upcoming Spending: </span>
                    <span class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthUpcomingSpending, user?.defaultCurrency) }}
                    </span>
                </div>
            </div>

            <div class="flex items-center space-x-20">
                <div class="flex items-end space-x-2">
                    <span class="label-medium-large">Budget: </span>
                    <span class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthBudget, user?.defaultCurrency) }}
                    </span>
                </div>

                <div class="flex items-end space-x-2">
                    <span class="label-medium-large">Remaining Budget: </span>
                    <span class="label-medium">
                        {{ formatMoneyAmount(user?.currentMonthRemainingBudget, user?.defaultCurrency) }}
                    </span>
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
            return `${this.formatCurrency(currency)} ${amount.toFixed(2)}`;
        }
        return '-';
    }

    formatCurrency(currency: string): string {
        return currency === 'USD' ? '$' : currency;
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

    editDetails() {
        this.$router.push("/edit-user-details");
    }
}
</script>
