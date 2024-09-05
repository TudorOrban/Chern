<template>
    <div class="header flex items-center justify-between w-full px-8 py-4 border-b border-gray-300 shadow-sm">
        <div>
            <h2 class="text-2xl font-semibold italic">Chern</h2>
        </div>
        
        
        <nav class="space-x-12 font-semibold text-xl">
            <router-link to="/">Home</router-link>
            <router-link to="/dashboard">Dashboard</router-link>
            <router-link to="/transactions">Transactions</router-link>
            <router-link to="/reports">Reports</router-link>
        </nav>

        <div class="flex items-center">
            <input type="text" placeholder="Search" class="custom-input rounded-r-none" />
            <button class="search-button rounded-l-none">
                <font-awesome-icon icon="search" class="w-4 h-4"/>
            </button>
        </div>

        <div class="flex items-center space-x-2">
            <router-link
                v-if="!isAuthenticated" 
                to="/login"
                class="auth-button"
            >
                Login
            </router-link>

            <router-link
                v-if="!isAuthenticated"
                to="/sign-up"
                class="auth-button"
            >
                Sign Up
            </router-link>

            <button
                v-if="isAuthenticated"  
                @click="logout"
                class="auth-button"
            >
                Logout
            </button>

            <router-link 
                v-if="isAuthenticated"
                to="/profile"
                class="profile-button"
            >
                {{ userInitials }}
            </router-link>

        </div>
    </div>
    
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { User } from '@/models/user.model';
import { StandardError } from '@/exceptions/error';

@Options({})
export default class HeaderComponent extends Vue {

    created() {
        if (this.isAuthenticated || localStorage.getItem('userToken')) {
            this.$store.dispatch('fetchUser').catch((error: StandardError) => {
                console.error("Failed to fetch user: ", error);
            });
        }
    }

    get isAuthenticated(): boolean {
        return !!this.$store.getters.isAuthenticated;
    }

    get user(): User | null {
        return this.$store.getters.user;
    }

    get userInitials(): string {
        if (this.user && this.user.username) {
            return this.user.username
                .replace(/[^A-Z]/g, "")
                .slice(0, 2); 
        }
        return '';
    }

    async logout() {
        try {
            await this.$store.dispatch('logout');
            this.$router.replace('/login');
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    }
}


</script>