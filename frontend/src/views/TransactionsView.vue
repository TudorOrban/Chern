<template>
    <div class="page-standard-horizontal-padding py-4">
        <div class="flex items-center justify-between">
            <h1 class="page-title py-4">Transactions ({{ transactions?.totalCount ?? 0 }})</h1>

            <!-- Write Operations -->
            <div class="flex items-center space-x-2">
                <!-- Delete -->
                <button
                    v-if="isAuthenticated && !isCreating && !isEditing && areTransactionsSelected"
                    class="standard-delete-button"
                    @click="deleteTransactions"
                >
                    <font-awesome-icon icon="trash" />
                </button>

                <!-- Edit -->
                <button
                    v-if="isAuthenticated && !isCreating && !isEditing && areTransactionsSelected"
                    class="flex items-center standard-write-button"
                    @click="editTransactions"
                >
                    <font-awesome-icon icon="edit" class="mr-2" />
                    <span>Edit</span>
                </button>   

                <button
                    v-if="isAuthenticated && !isCreating && isEditing"
                    class="flex items-center standard-button"
                    @click="cancelEditingTransactions"
                >
                    <font-awesome-icon icon="times" class="mr-2" />
                    <span>Cancel</span>
                </button>

                <button
                    v-if="isAuthenticated && !isCreating && isEditing"
                    class="flex items-center standard-write-button"
                    @click="saveEditedTransactions"
                >
                    <font-awesome-icon icon="save" class="mr-2" />
                    <span>Save</span>
                </button>

                <!-- Add -->
                <button
                    v-if="isAuthenticated && isCreating && !isEditing"
                    class="flex items-center standard-button"
                    @click="cancelCreatingTransactions"
                >
                    <font-awesome-icon icon="times" class="mr-2" />
                    <span>Cancel</span>
                </button>
                
                <button
                    v-if="isAuthenticated && isCreating && !isEditing"
                    class="flex items-center standard-write-button"
                    @click="createTransactionsInBulk"
                >
                    <font-awesome-icon icon="save" class="mr-2" />
                    <span>Save</span>
                </button>

                <button
                    v-if="isAuthenticated && !isCreating && !isEditing"
                    class="flex items-center standard-write-button"
                    @click="addTemporaryTransaction"
                >
                    <font-awesome-icon icon="plus" class="mr-2" />
                    <span>Add</span>
                </button>
            </div>
        </div>

        <!-- Search Options -->
        <div class="flex items-center space-x-2 py-4">
            <div class="flex items-center">
                <input
                    v-model="searchParams.searchQuery"
                    type="text"
                    class="custom-input h-9"
                    placeholder="Search by Type"
                >
                <button
                    class="standard-button w-9 h-9 flex items-center justify-center"
                    @click="searchTransactions"
                >
                    <font-awesome-icon icon="search"/>
                </button>
            </div>


            <select v-model="searchParams.sortBy" @change="sortTransactions" class="custom-select">
                <option disabled value="">Sort by</option>
                <option v-for="option in sortOptions" :key="option" :value="option">
                    {{ option.charAt(0).toUpperCase() + option.slice(1) }}
                </option>
            </select>

            <button
                class="standard-button w-9 h-9 flex items-center justify-center"
                @click="changeSortDirection"
            >
                <font-awesome-icon v-if="searchParams.isDescending" icon="arrow-up-wide-short"/>
                <font-awesome-icon v-else icon="arrow-down-short-wide"/>
            </button>

            <button
                class="standard-button w-9 h-9 flex items-center justify-center"
                @click="searchTransactions"
            >
                <font-awesome-icon icon="arrow-rotate-right"/>
            </button>
        </div>
        
        <!-- Transactions Table -->
        <table class="w-full border border-gray-200 rounded-md shadow-sm">
            <thead>
                <tr class="bg-gray-100 border-b border-gray-300">
                    <th class="px-4 py-2"><input type="checkbox" @change="toggleAll" v-model="allSelected"></th>
                    <th class="px-4 py-2">Date</th>
                    <th class="px-4 py-2">Type</th>
                    <th class="px-4 py-2">Amount</th>
                    <th class="px-4 py-2">Recurrent</th>
                </tr>
            </thead>
            <tbody>
                <!-- Temporary Transactions (for Create) -->
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

                <!-- Transactions list -->
                <tr v-if="transactions?.results?.length > 0" v-for="transaction in transactions?.results ?? []" :key="transaction.id" class="border-b">
                    <td class="px-4 py-2">
                        <input type="checkbox" v-model="transaction.isSelected" @change="areTransactionsSelected = transactions.results.some(t => t.isSelected)">
                    </td>
                    <td class="px-4 py-2">
                        <template v-if="transaction.isEditing">
                            <input type="date" v-model="transaction.date" class="custom-input">
                        </template>
                        <template v-else>
                            {{ formatDate(transaction?.date) }}
                        </template>
                    </td>
                    <td class="px-4 py-2">
                        <template v-if="transaction.isEditing">
                            <input type="text" v-model="transaction.type" class="custom-input">
                        </template>
                        <template v-else>
                            {{ transaction?.type }}
                        </template>
                    </td>
                    <td class="px-4 py-2">
                        <template v-if="transaction.isEditing">
                            <input type="number" v-model.number="transaction.amount" class="custom-input">
                        </template>
                        <template v-else>
                            {{ formatCurrency(transaction.amount) }}
                        </template>
                    </td>
                    <td class="px-4 py-2">
                        <template v-if="transaction.isEditing">
                            <select v-model="transaction.isRecurrent" class="custom-input">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </template>
                        <template v-else>
                            {{ transaction?.isRecurrent ? 'Yes' : 'No' }}
                        </template>
                    </td>
                </tr>

                <tr v-else>
                    <td class="p-4 text-lg font-semibold" colspan="5">No transactions found.</td>
                </tr>
            </tbody>
        </table>

        <!-- Page Selector -->
        <div class="flex items-center justify-end w-full">
            <div class="bg-gray-100 border border-gray-300 flex items-center px-4 py-2">
                <button 
                    :disabled="searchParams.page <= 1" 
                    @click="changePage(searchParams.page - 1)"
                    class="disabled:opacity-50 flex items-center"
                >
                    <font-awesome-icon icon="caret-left" class="w-5 h-5 text-gray-800" />
                </button>

                <button
                    :disabled="n === -1"
                    v-for="n in pageNumbers"
                    :key="n"
                    :class="{'bg-blue-500 text-white border border-gray-200': n === searchParams.page, 'bg-white border border-gray-200': n !== searchParams.page}"
                    @click="changePage(n)"
                    class="px-4 py-2 rounded hover:bg-blue-300 transition-colors"
                >
                    {{ n !== -1 ? n : '...' }}
                </button>

                <button 
                    :disabled="searchParams.page >= totalPages" 
                    @click="changePage(searchParams.page + 1)"
                    class="disabled:opacity-50 flex items-center"
                >
                    <font-awesome-icon icon="caret-right" class="w-5 h-5 text-gray-800" />
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { TransactionDetailsDTO, CreateTransactionDTO } from '@/DTOs/transaction.dto';
import { UserDetailsDTO } from '@/DTOs/user.dto';
import TransactionService from '@/services/transaction.service';
import { PaginatedResults, SearchParams } from '@/models/search.model';

@Options({})
export default class TransactionsView extends Vue {
    transactionService = new TransactionService();

    sortOptions = ['date', 'amount'];
    searchParams: SearchParams = {
        searchQuery: '',
        sortBy: 'date',
        isDescending: true,
        page: 1,
        itemsPerPage: 10
    }

    temporaryTransactions: CreateTransactionDTO[] = [];
    isCreating: boolean = false;
    areTransactionsSelected: boolean = false;
    isEditing: boolean = false;
    
    get isAuthenticated(): boolean {
        return !!this.$store.getters.isAuthenticated;
    }

    get user() {
        return this.$store.getters.user;
    }

    get transactions(): PaginatedResults<TransactionDetailsDTO> {
        return this.$store.getters.userTransactions;
    }

    get totalPages(): number {
        return Math.ceil((this.transactions?.totalCount ?? 0) / (this.searchParams.itemsPerPage ?? 1));
    }

    get pageNumbers(): number[] {
        const range = [];
        let isTruncationAdded = false;

        for (let i = 1; i <= this.totalPages; i++) {
            if (i <= 5 || i > this.totalPages - 2 || (i >= this.searchParams.page - 2 && i <= this.searchParams.page + 2)) {
                range.push(i);
            } else {
                if (!isTruncationAdded) {
                    range.push(-1);
                    isTruncationAdded = true;
                }
            }
        }
        return range;
    }

    created() {
        this.searchTransactions();
    }

    // Await for user to become available
    @Watch('user', { immediate: true, deep: true })
    onUserChanged(newValue: UserDetailsDTO, oldValue: UserDetailsDTO) {
        console.log('User changed:', newValue, oldValue);
        if (newValue && newValue.id !== oldValue?.id) {
            this.searchTransactions();
        }
    }

    private searchTransactions() {
        if (this.isAuthenticated && this.user) {
            this.$store.dispatch('searchUserTransactions', this.searchParams);
            console.log('User transactions:', this.transactions);
        }
    }

    // Search handlers
    sortTransactions() {
        this.searchTransactions();
    }

    changeSortDirection() {
        this.searchParams.isDescending = !this.searchParams.isDescending;
        this.searchTransactions();
    }
    
    changePage(page: number) {
        this.searchParams.page = page;
        this.searchTransactions();
    }

    // Write Handlers
    // - Create
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
        if (this.isAuthenticated && this.user) {
            this.transactionService.createTransactionsInBulk(this.temporaryTransactions)
                .then(() => {
                    this.searchTransactions();
                    this.cancelCreatingTransactions();
                })
                .catch((error) => {
                    console.error('Failed to create transactions:', error);
                });
        }
    }

    cancelCreatingTransactions() {
        this.isCreating = false;
        this.temporaryTransactions = [];
    }

    // - Update
    toggleAll() {
        const currentState = this.allSelected;
        this.temporaryTransactions.forEach(t => t.isSelected = currentState);
        this.transactions.results.forEach(t => t.isSelected = currentState);
    }

    editTransactions() {
        this.isEditing = true;
        for (const transaction of this.transactions.results) {
            if (transaction.isSelected) {
                transaction.isEditing = true;
            }
        }
    }

    saveEditedTransactions() {
        const editedTransactions = this.transactions.results.filter(t => t.isEditing);
        const transactionDTOs = editedTransactions.map(t => ({
            id: t.id,
            date: t.date,
            type: t.type,
            amount: t.amount,
            isRecurrent: t.isRecurrent
        }));
        this.transactionService.updateTransactionsInBulk(transactionDTOs)
            .then(() => {
                this.searchTransactions();
                this.cancelEditingTransactions();
            })
            .catch((error) => {
                console.error('Failed to update transactions:', error);
            });
    }

    cancelEditingTransactions() {
        this.isEditing = false;
        for (const transaction of this.transactions.results) {
            transaction.isEditing = false;
            transaction.isSelected = false;
        }
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