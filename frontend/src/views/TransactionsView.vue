<template>
    <div class="page-standard-horizontal-padding py-4">
        <div class="flex items-center justify-between">
            <h1 class="page-title py-4">Transactions</h1>

            <button
                class="standard-write-button"
            >
                Create
            </button>
        </div>
        
        <table class="w-full mt-4">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="px-4 py-2">Date</th>
                    <th class="px-4 py-2">Type</th>
                    <th class="px-4 py-2">Amount</th>
                    <th class="px-4 py-2">Recurrent</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id" class="border-b">
                    <td class="px-4 py-2">{{ transaction?.date | formatDate }}</td>
                    <td class="px-4 py-2">{{ transaction?.type }}</td>
                    <td class="px-4 py-2">{{ transaction.amount | currency }}</td>
                    <td class="px-4 py-2">{{ transaction?.isRecurrent ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TransactionDetailsDTO } from '@/DTOs/transaction.dto';

@Options({})
export default class TransactionsView extends Vue {
    
    created() {
        if (this.isAuthenticated && this.user) {
            this.$store.dispatch('fetchUserTransactions').then(() => {
                this.$forceUpdate();
            });
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
}

</script>