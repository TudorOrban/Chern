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
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TransactionDetailsDTO } from '@/DTOs/transaction.dto';

@Options({})
export default class TransactionsView extends Vue {
    
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
        return this.$store.getters.transactions;
    }


}

</script>