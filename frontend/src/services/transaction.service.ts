import API, { API_URL } from "@/api/axios/axios";
import { CreateTransactionDTO, TransactionDetailsDTO, UpdateTransactionDTO } from "@/DTOs/transaction.dto";

export default class TransactionService {
    
    async getTransactionById(id: string): Promise<TransactionDetailsDTO | null> {
        const response = await API.get(`${API_URL}/transactions/${id}`);

        return response.data;
    }

    async getTransactionsByUser(userId: string): Promise<TransactionDetailsDTO[]> {
        const response = await API.get(`${API_URL}/transactions/user/${userId}`);

        return response.data;
    }

    async createTransaction(transaction: CreateTransactionDTO): Promise<TransactionDetailsDTO | null> {
        const response = await API.post(`${API_URL}/transactions`, transaction);

        return response.data;
    }

    async createTransactionsInBulk(transactions: CreateTransactionDTO[]): Promise<TransactionDetailsDTO[]> {
        const response = await API.post(`${API_URL}/transactions/bulk`, transactions);

        return response.data;
    }

    async updateTransaction(transaction: UpdateTransactionDTO): Promise<TransactionDetailsDTO | null> {
        const response = await API.put(`${API_URL}/transactions`, transaction);

        return response.data;
    }

    async updateTransactionsInBulk(transactions: UpdateTransactionDTO[]): Promise<TransactionDetailsDTO[]> {
        const response = await API.put(`${API_URL}/transactions/bulk`, transactions);

        return response.data;
    }
    
    async deleteTransaction(id: string): Promise<TransactionDetailsDTO | null> {
        const response = await API.delete(`${API_URL}/transactions/${id}`);

        return response.data;
    }
}