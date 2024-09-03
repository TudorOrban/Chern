<template>
    <div class="flex flex-col items-center justify-center w-full py-8">
        <div class="py-4">
            <h2 class="text-xl font-semibold">Sign Up</h2>
        </div>
        
        <form @submit.prevent="handleSubmit" class="form-container" space-y-4>
            <div class="text-left">
                <label for="email" class="form-label">Email:</label>
                <input id="email" v-model="email" @blur="validateEmail" class="form-input" />
                <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
            </div>
            <div class="text-left">
                <label for="username" class="form-label">Username:</label>
                <input id="username" v-model="username" @blur="validateUsername" class="form-input" />
                <span v-if="errors.username" class="form-error">{{ errors.username }}</span>
            </div>
            <div class="text-left">
                <label for="password" class="form-label">Password:</label>
                <input id="password" v-model="password" @blur="validatePassword" class="form-input" />
                <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
            </div>

            <div class="flex items-center justify-between w-full p-8">
                <button type="submit" class="form-button">Sign Up</button>

                <router-link to="/login" class="form-link">
                    Login
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

export default class SignUpView extends Vue {
    authService!: AuthService;

    email = '';
    username = '';
    password = '';
    errors = {
        email: '',
        username: '',
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

    validateUsername() {
        if (this.username.length < 6) {
            this.errors.username = 'Username must be at least 6 characters.';
        } else {
            this.errors.username = '';
        }
    }

    async handleSubmit() {
        this.validateEmail();
        this.validatePassword();
        this.validateUsername();
        if (this.errors.email || this.errors.username || this.errors.password) {
            return;
        }

        try {
            await this.$store.dispatch('signUp', {
                email: this.email,
                password: this.password,
                username: this.username
            });
            this.$store.dispatch('fetchUser');
            this.$router.push('/');
        } catch (error) {
            this.areCredentialsInvalid = true;
            console.error("Sign Up failed: ", error);
        }
    }
}
</script>