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
                v-if="!isAuthenticated" 
                to="/login"
            >
                Login
            </router-link>

            <router-link
                v-if="!isAuthenticated"
                to="/sign-up"
            >
                Sign Up
            </router-link>

            <button
                v-if="isAuthenticated"  
                @click="logout"
            >
                Logout
            </button>

            <button 
                v-if="isAuthenticated"
                class="w-10 h-10 bg-purple-700 rounded-full border border-gray-300 shadow-sm font-semibold text-white"
            >
                TO
            </button>

        </div>
    </div>
    
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Options, Vue } from 'vue-class-component';
import { mapGetters } from 'vuex';

@Options({
    computed: {
        ...mapGetters(['isAuthenticated'])
    }
})
export default class HeaderComponent extends Vue {
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