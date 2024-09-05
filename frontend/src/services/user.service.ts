import API, { API_URL } from "@/api/axios/axios";
import { UpdateUserDTO, UserDetailsDTO } from "@/DTOs/user.dto";

export default class UserService {
    
    async getUserByEmail(email: string): Promise<UserDetailsDTO> {
        const response = await API.get(`${API_URL}/users/email/${email}`);

        return response.data;
    }

    async getUserByToken(token: string): Promise<UserDetailsDTO> {
        const response = await API.get(`${API_URL}/users/token/${token}`);

        return response.data;
    }

    async updateUser(user: UpdateUserDTO): Promise<UserDetailsDTO> {
        const response = await API.put(`${API_URL}/users`, user);

        return response.data;
    }

    async refreshUserBudget(id: string): Promise<UserDetailsDTO> {
        console.log("User id: ", id);
        const response = await API.put(`${API_URL}/users/budget/refresh/${id}`, null);

        return response.data;
    }

    async deleteUser(id: string): Promise<UserDetailsDTO> {
        const response = await API.delete(`${API_URL}/users/${id}`);

        return response.data;
    }
}