<template>
    <div class="flex flex-col items-center justify-center w-full py-8">
        <div class="py-4">
            <h2 class="text-xl font-semibold">Login</h2>
        </div>
        
        <form @submit.prevent="handleSubmit" class="form-container" space-y-4>
            <div class="text-left">
                <label for="email" class="form-label">Email:</label>
                <input id="email" v-model="email" @blur="validateEmail" class="form-input" />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
            </div>
            <div class="text-left">
                <label for="password" class="form-label">Password:</label>
                <input id="password" v-model="password" @blur="validatePassword" class="form-input" />
                <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
            </div>

            <div class="flex items-center justify-between w-full p-8">
                <button type="submit" class="form-button">Login</button>

                <router-link to="/sign-up" class="form-link">
                    Sign Up
                </router-link>
            </div>

            <div v-if="areCredentialsInvalid" class="form-message">
                <p>Invalid email or password.</p>
            </div>
        </form>
    </div>
    
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Vue } from 'vue-class-component';

export default class LoginView extends Vue {
    authService!: AuthService;

    email = '';
    password = '';
    errors = {
        email: '',
        password: ''
    };

    areCredentialsInvalid = false;
    
    created() {
        this.authService = new AuthService();

    }
    
    validateEmail() {
        if (!this.email.includes('@')) {
            this.errors.email = 'Please enter a valid email.';
        } else {
            this.errors.email = '';
        }
    }

    validatePassword() {
        if (this.password.length < 6) {
            this.errors.password = 'Password must be at least 6 characters.';
        } else {
            this.errors.password = '';
        }
    }

    async handleSubmit() {
        this.validateEmail();
        this.validatePassword();
        if (this.errors.email || this.errors.password) {
            return;
        }

        try {
            const response = await this.authService.login(this.email, this.password);
            console.log("Login successful: ", response);
            localStorage.setItem('userToken', response.token);
        } catch (error) {
            this.areCredentialsInvalid = true;
            console.error("Login failed: ", error);
        }
    }
}
</script>