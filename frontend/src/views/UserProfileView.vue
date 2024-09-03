<template>
    <div>
        <h1>User Profile</h1>
        <div v-if="user">
            <p>Email: {{ user.email }}</p>
            <p>Username: {{ user.username }}</p>
        </div>
        <div v-else>
            <p>User not found.</p>
        </div>
    </div>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { User } from '@/models/user.model';

@Options({})
export default class UserProfileView extends Vue {
    
    get user(): User | null {
        return this.$store.getters.user;
    }
}

</script>