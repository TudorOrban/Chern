import { TransactionDetailsDTO } from "@/DTOs/transaction.dto";
import { User } from "@/models/user.model";
import AuthService from "@/services/auth.service";
import TransactionService from "@/services/transaction.service";
import UserService from "@/services/user.service";
import { createStore } from "vuex";

const authService = new AuthService();
const userService = new UserService();
const transactionService = new TransactionService();

interface State {
    user: User | null;
    token: string | null;
    userTransactions: TransactionDetailsDTO[] | null;
}

export default createStore<State>({
    state: {
        user: null,
        token: localStorage.getItem("userToken") ?? "",
        userTransactions: null,
    },
    getters: {
        isAuthenticated: (state: State): boolean => !!state.token,
        user: (state: State): User | null => state.user,
        userTransactions: (state: State): TransactionDetailsDTO[] | null => state.userTransactions,
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("userToken", token);
        },
        setUser(state, user) {
            state.user = user;
        },
        clearAuth(state) {
            state.token = "";
            state.user = null;
            localStorage.removeItem("userToken");
        },
        setUserTransactions(state, transactions) {
            state.userTransactions = transactions;
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                const response = await authService.login(email, password);
                commit("setToken", response.token);
                await this.dispatch('fetchUser');
            } catch (error) {
                console.error(error);
                throw new Error('Authentication failed');
            }
        },
        async signUp({ commit }, { email, password, username }) {
            try {
                const response = await authService.signUp(email, password, username);
                commit("setToken", response.token);
                await this.dispatch('fetchUser');
            } catch (error) {
                console.error(error);
                throw new Error('Failed to sign up');
            }
        },
        async fetchUser({ commit, state }) {
            try {
                if (!state.token) {
                    throw new Error('No token found');
                }
                const user = await userService.getUserByToken(state.token);
                commit("setUser", user);
            } catch (error) {
                console.error(error);
                commit("clearAuth");
                throw error;
            }
        },
        async fetchUserTransactions({ commit, state }) {
            console.log("Fetching user transactions");
            try {
                if (!state.user) {
                    throw new Error('No user found');
                }
                const transactions = await transactionService.getTransactionsByUser(state.user.id);
                commit("setUserTransactions", transactions);
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch user transactions');
            }
        },
        logout({ commit }) {
            commit("clearAuth");
        }
    },
    modules: {},
});
