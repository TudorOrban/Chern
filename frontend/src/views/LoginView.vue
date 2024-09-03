<template>
    <div class="flex items-center justify-center w-full px-4">
        <div>
            <h2 class="text-xl font-semibold">Login</h2>
        </div>
        
        <div class="flex items-center space-x-2">
            <button
                v-if="!isLoggedIn" 
                @click="login"
            >
                Login
            </button>

            <router-link to="/sign-up">
                Sign Up
            </router-link>
        </div>
    </div>
    
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Vue } from 'vue-class-component';

export default class LoginView extends Vue {
    authService!: AuthService;

    isLoggedIn = false;
    
    created() {
        this.authService = new AuthService();
    }

    async login() {
        try {
            const response = await this.authService.login('to2@gmail.com', 'cjql195jsov');
            console.log("Login successful: ", response);
            localStorage.setItem('userToken', response.token);
            this.isLoggedIn = true;
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }
}
</script>