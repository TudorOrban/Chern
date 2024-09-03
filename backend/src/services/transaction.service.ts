import { inject, injectable } from "inversify";
import { CreateTransactionDTO, TransactionDetailsDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";
import TYPES from "../config/types";
import { TransactionRepository } from "../repositories/transaction.repository";
import { ITransaction } from "../models/transaction.model";


export interface TransactionService {
    getTransactionById(transactionId: string): Promise<TransactionDetailsDTO | null>;
    getTransactionsByUserId(userId: string): Promise<TransactionDetailsDTO[]>;
    createTransaction(transaction: CreateTransactionDTO): Promise<TransactionDetailsDTO | null>;
    updateTransaction(transaction: UpdateTransactionDTO): Promise<TransactionDetailsDTO | null>;
    deleteTransaction(transactionId: string): Promise<TransactionDetailsDTO | null>;
}

@injectable()
export class TransactionServiceImpl implements TransactionService {

    constructor(
        @inject(TYPES.TransactionRepository) private transactionRepository: TransactionRepository
    ) {}
    
    getTransactionById = async (transactionId: string): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.findTransactionById(transactionId)
            .then(this.mapTransactionToTransactionDetails);
    }

    getTransactionsByUserId = async (userId: string): Promise<TransactionDetailsDTO[]> => {
        return this.transactionRepository.findTransactionsByUserId(userId)
            .then((transactions: ITransaction[]) => transactions.map((transaction) => this.mapTransactionToTransactionDetails(transaction) as TransactionDetailsDTO));
    }

    createTransaction = async (transactionDTO: CreateTransactionDTO): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.createTransaction(transactionDTO)
            .then(this.mapTransactionToTransactionDetails);
    }

    updateTransaction = async (transactionDTO: UpdateTransactionDTO): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.updateTransaction(transactionDTO)
            .then(this.mapTransactionToTransactionDetails);
    }
    
    deleteTransaction = async (transactionId: string): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.deleteTransaction(transactionId)
            .then(this.mapTransactionToTransactionDetails);
    }

    private mapTransactionToTransactionDetails(transaction: ITransaction | null): TransactionDetailsDTO | null {
        if (!transaction) return null;
        return {
            id: transaction.id,
            userId: transaction.userId,
            amount: transaction.amount,
            type: transaction?.type,
            date: transaction?.date,
            isRecurrent: transaction?.isRecurrent
        };
    }

}