import { User } from "@/models/user.model";
import AuthService from "@/services/AuthService";
import UserService from "@/services/UserService";
import { createStore } from "vuex";

const authService = new AuthService();
const userService = new UserService();

interface State {
    user: User | null;
    token: string | null;
}

export default createStore<State>({
    state: {
        user: null,
        token: localStorage.getItem("userToken") ?? "",
    },
    getters: {
        isAuthenticated: (state: State): boolean => !!state.token,
        user: (state: State): User | null => state.user,
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
                if (!state.token) {
                    throw new Error('No token found');
                }
                const user = await userService.getUserByToken(state.token);
                commit("setUser", user);
                console.log(state.user);
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
