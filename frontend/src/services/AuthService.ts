import API, { API_URL } from "@/api/axios/axios";

export default class AuthService {
    
    async login(email: string, password: string): Promise<{ token: string }> {
        const response = await API.post(`${API_URL}/login`, { email, password });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        return response.data;
    }

    async signUp(email: string, password: string, username: string): Promise<{ token: string }> {
        const response = await API.post(`${API_URL}/sign-up`, {email, password, username });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        return response.data;
    }
}