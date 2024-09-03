import AuthService from "@/services/AuthService";
import { createStore } from "vuex";

const authService = new AuthService();

export default createStore({
    state: {
        user: null,
        token: localStorage.getItem("userToken") ?? "",
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        user: (state) => state.user,
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
                console.log(state.token);
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch user');
            }
        },
        logout({ commit }) {
            commit("clearAuth");
        }
    },
    modules: {},
});
