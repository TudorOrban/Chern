import API, { API_URL } from "@/api/axios/axios";
import { UserDetailsDTO } from "@/DTOs/user.dto";

export default class UserService {
    
    async getUserByEmail(email: string): Promise<UserDetailsDTO> {
        const response = await API.get(`${API_URL}/users/email/${email}`);

        return response.data;
    }

    async getUserByToken(token: string): Promise<UserDetailsDTO> {
        const response = await API.get(`${API_URL}/users/token/${token}`);

        return response.data;
    }
}