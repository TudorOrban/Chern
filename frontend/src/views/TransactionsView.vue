<template>
    <div class="page-standard-horizontal-padding py-4">
        <div class="flex items-center justify-between">
            <h1 class="page-title py-4">Transactions</h1>

            <!-- Search Options -->
            <div class="flex items-center space-x-2">
                <select v-model="selectedSortOption" @change="sortTransactions" class="custom-select">
                    <option disabled value="">Sort by</option>
                    <option v-for="option in sortOptions" :key="option" :value="option">
                        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                    </option>
                </select>

                <button
                    class="standard-button w-9 h-9 flex items-center justify-center"
                    @click="changeSortDirection"
                >
                    <font-awesome-icon v-if="sortDirection" icon="arrow-up-wide-short"/>
                    <font-awesome-icon v-else icon="arrow-down-short-wide"/>
                </button>

                <button
                    class="standard-button w-9 h-9 flex items-center justify-center"
                    @click="refreshTransactions"
                >
                    <font-awesome-icon icon="arrow-rotate-right"/>
                </button>
            </div>

            <!-- Write Options -->
            <div class="flex items-center space-x-2">
                <button
                    v-if="isAuthenticated && isCreating"
                    class="flex items-center standard-button"
                    @click="cancelCreatingTransactions"
                >
                    <font-awesome-icon icon="times" class="mr-2" />
                    <span>Cancel</span>
                </button>
                <button
                    v-if="isAuthenticated && isCreating"
                    class="flex items-center standard-write-button"
                    @click="createTransactionsInBulk"
                >
                    <font-awesome-icon icon="save" class="mr-2" />
                    <span>Save</span>
                </button>
                <button
                    v-if="isAuthenticated"
                    class="flex items-center standard-write-button"
                    @click="addTemporaryTransaction"
                >
                    <font-awesome-icon icon="plus" class="mr-2" />
                    <span>Add</span>
                </button>
            </div>
        </div>
        
        <table class="w-full border border-gray-200 rounded-md shadow-sm">
            <thead>
                <tr class="bg-gray-100">
                    <th class="px-4 py-2">Date</th>
                    <th class="px-4 py-2">Type</th>
                    <th class="px-4 py-2">Amount</th>
                    <th class="px-4 py-2">Recurrent</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id" class="border-b">
                    <td class="px-4 py-2">{{ formatDate(transaction?.date) }}</td>
                    <td class="px-4 py-2">{{ transaction?.type }}</td>
                    <td class="px-4 py-2">{{ formatCurrency(transaction.amount) }}</td>
                    <td class="px-4 py-2">{{ transaction?.isRecurrent ? 'Yes' : 'No' }}</td>
                </tr>

                <tr v-for="(transaction, index) in temporaryTransactions" :key="transaction.temporaryId" class="border-b">
                    <td class="px-4 py-2">
                        <input type="date" v-model="transaction.date" class="custom-input">
                    </td>
                    <td class="px-4 py-2">
                        <input type="text" v-model="transaction.type" class="custom-input">
                    </td>
                    <td class="px-4 py-2">
                        <input type="number" v-model.number="transaction.amount" class="custom-input">
                    </td>
                    <td class="px-4 py-2">
                        <select v-model="transaction.isRecurrent" class="custom-input">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TransactionDetailsDTO, CreateTransactionDTO } from '@/DTOs/transaction.dto';
import TransactionService from '@/services/transaction.service';

@Options({})
export default class TransactionsView extends Vue {
    transactionService = new TransactionService();

    selectedSortOption = '';
    sortOptions = ['date', 'amount'];
    sortDirection: boolean = true;

    temporaryTransactions: CreateTransactionDTO[] = [];
    isCreating: boolean = false;
    
    created() {
        if (this.isAuthenticated && this.user) {
            this.$store.dispatch('fetchUserTransactions');
        }
    }

    get isAuthenticated(): boolean {
        return !!this.$store.getters.isAuthenticated;
    }

    get user() {
        return this.$store.getters.user;
    }

    get transactions(): TransactionDetailsDTO[] {
        return this.$store.getters.userTransactions;
    }

    // Search handlers
    changeSortDirection() {
        this.sortDirection = !this.sortDirection;
    }

    refreshTransactions() {
        if (this.isAuthenticated && this.user) {
            this.$store.dispatch('fetchUserTransactions');
        }
    }

    // Write Handlers
    addTemporaryTransaction() {
        this.isCreating = true;

        this.temporaryTransactions.push({
            userId: this.user?.id,
            date: new Date(),
            type: 'Expense',
            amount: 0,
            isRecurrent: false,
            temporaryId: Math.random().toString(36).substring(7)
        });
    }

    createTransactionsInBulk() {

    }

    cancelCreatingTransactions() {
        this.isCreating = false;
        this.temporaryTransactions = [];
    }

    // Utils
    // TODO: Move these to a formatting service 
    formatDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    formatCurrency(amount: number): string {
        return `$${amount.toFixed(2)}`;
    }
}

</script>