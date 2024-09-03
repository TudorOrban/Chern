<template>
    <div class="flex items-center justify-between w-full px-8 py-4 border-b border-gray-300 shadow-sm">
        <div>
            <h2 class="text-xl font-semibold">Sign Up</h2>
        </div>
        
        <div class="flex items-center space-x-2">
            <router-link to="/login">
                Login
            </router-link>

            <button
                v-if="!isLoggedIn"
                @click="signUp"
            >
                Sign Up
            </button>
        </div>
    </div>
    
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Vue } from 'vue-class-component';

export default class SignUpView extends Vue {
    authService!: AuthService;

    isLoggedIn = false;
    
    created() {
        this.authService = new AuthService();
    }

    async signUp() {
        try {
            const response = await this.authService.signUp('to3@gmail.com', 'cjql195jsov', 'to3');
            console.log("Sign up successful: ", response);
            localStorage.setItem('userToken', response.token);
            this.isLoggedIn = true;
        } catch (error) {
            console.error("Sign up failed: ", error);
        }
    }
}


</script>