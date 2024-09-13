<template>
    <div class="page-standard-horizontal-padding py-4">
        <div class="flex items-center justify-center w-full py-4">
            <h2 class="page-title">
                Edit Details
            </h2>
        </div>

        <div class="flex items-center space-x-2">
            <label for="currency-select" class="form-label">Default Currency:</label>
            <select id="currency-select" v-model="selectedCurrency" class="custom-select">
                <option disabled value="">Please select one</option>
                <option v-for="currency in currencies" :key="currency" :value="currency">
                    {{ currency }}
                </option>
            </select>
        </div>

        
        <form @submit.prevent="handleSubmit">
            <div class="text-left">
                <label for="monthlyIncome" class="form-label">Monthly Income:</label>
                <input id="monthlyIncome" v-model="monthlyIncome" @blur="validateMonthlyIncome" class="form-input" />
                <span v-if="errors.monthlyIncome" class="form-error">{{ errors.monthlyIncome }}</span>
            </div>
            <div class="text-left">
                <label for="currentMonthBudget" class="form-label">Current Month Budget:</label>
                <input id="currentMonthBudget" v-model="currentMonthBudget" @blur="validateCurrentMonthBudget" class="form-input" />
                <span v-if="errors.currentMonthBudget" class="form-error">{{ errors.currentMonthBudget }}</span>
            </div>

            <div class="flex items-center justify-between w-full p-8">
                <button type="submit" class="form-button">Login</button>

                <router-link to="/sign-up" class="form-link">
                    Sign Up
                </router-link>
            </div>

            <div v-if="areCredentialsInvalid" class="form-message">
                <p>Invalid Monthly Income or Current Month Budget.</p>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import UserService from "@/services/user.service";
import { Options, Vue } from "vue-class-component";

@Options({})
export default class EditUserDetailsView extends Vue {
    currencies: string[] = ["USD", "EUR", "GBP", "JPY"];
    selectedCurrency: string = "";

    monthlyIncome = '';
    currentMonthBudget = '';
    errors = {
        monthlyIncome: '',
        currentMonthBudget: ''
    };

    areCredentialsInvalid = false;
    
    get user() {
        return this.$store.getters.user;
    }
    
    created() {
        this.selectedCurrency = this.user?.defaultCurrency ?? "";
    }

    validateMonthlyIncome() {
        if (!this.monthlyIncome.includes('@')) {
            this.errors.monthlyIncome = 'Please enter a valid monthlyIncome.';
        } else {
            this.errors.monthlyIncome = '';
        }
    }

    validateCurrentMonthBudget() {
        if (this.currentMonthBudget.length < 6) {
            this.errors.currentMonthBudget = 'CurrentMonthBudget must be at least 6 characters.';
        } else {
            this.errors.currentMonthBudget = '';
        }
    }

    async handleSubmit() {
        this.validateMonthlyIncome();
        this.validateCurrentMonthBudget();
        if (this.errors.monthlyIncome || this.errors.currentMonthBudget) {
            return;
        }

        try {
            await this.$store.dispatch('login', {
                monthlyIncome: this.monthlyIncome,
                currentMonthBudget: this.currentMonthBudget
            });
            this.$store.dispatch('fetchUser');
            this.$router.push('/');
        } catch (error) {
            this.areCredentialsInvalid = true;
            console.error("Login failed: ", error);
        }
    }
    
}

</script>