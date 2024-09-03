<template>
    <button
        v-if="!isLoggedIn" 
        @click="login"
    >
        Login
    </button>

    <button
        v-if="isLoggedIn"  
        @click="logout"
    >
        Logout
    </button>

    <div v-if="isLoggedIn">
        <p>Logged in</p>
    </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Vue } from 'vue-class-component';

export default class HeaderComponent extends Vue {
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

    async logout() {
        try {
            localStorage.removeItem('userToken');
            this.isLoggedIn = false;
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    }
}


</script>