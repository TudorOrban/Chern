<template>
    <div class="flex items-center justify-between w-full px-8 py-4 border-b border-gray-300 shadow-sm">
        <div>
            <h2 class="text-xl font-semibold">Chern</h2>
        </div>
        
        
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/dashboard">Dashboard</router-link>
        </nav>

        <div class="flex items-center space-x-2">
            <router-link
                v-if="!isLoggedIn" 
                to="/login"
            >
                Login
            </router-link>

            <router-link
                v-if="!isLoggedIn"
                to="/sign-up"
            >
                Sign Up
            </router-link>

            <button
                v-if="isLoggedIn"  
                @click="logout"
            >
                Logout
            </button>

        </div>
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