import axios from "axios";

const API_URL = 'http://localhost:3000/api/v1';

export default class AuthService {
    
    async login(email: string, password: string): Promise<{ token: string }> {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        return response.data;
    }

    async signUp(email: string, password: string, username: string): Promise<{ token: string }> {
        const response = await axios.post(`${API_URL}/sign-up`, {email, password, username });

        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }

        return response.data;
    }
}