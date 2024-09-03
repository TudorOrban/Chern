<template>
    <button @click="login">Login</button>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Vue } from 'vue-class-component';

export default class HeaderComponent extends Vue {
    authService!: AuthService;
    
    created() {
        this.authService = new AuthService();
    }

    async login() {
        try {
            const response = await this.authService.login('to2@gmail.com', 'cjql195jsov');
            console.log("Login successful: ", response);
        } catch (error) {
            console.error("Login failed: ", error);
        }
    }
}


</script>