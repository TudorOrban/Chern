import { injectable } from "inversify";
import { ITransaction, Transaction } from "../models/transaction.model";
import { CreateTransactionDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";


export interface TransactionRepository {
    findTransactionById(id: string): Promise<ITransaction | null>;
    findTransactionsByUserId(userId: string): Promise<ITransaction[]>;
    createTransaction(transactionDTI: CreateTransactionDTO): Promise<ITransaction>;
    updateTransaction(transactionDTO: UpdateTransactionDTO): Promise<ITransaction | null>;
    deleteTransaction(id: string): Promise<ITransaction | null>;
}

@injectable()
export class TransactionRepositoryImpl implements TransactionRepository {

    async findTransactionById(id: string): Promise<ITransaction | null> {
        return Transaction.findById(id).exec();
    }
    
    async findTransactionsByUserId(userId: string): Promise<ITransaction[]> {
        return Transaction.find({ userId: userId }).exec();
    }

    async createTransaction(transactionDTO: CreateTransactionDTO): Promise<ITransaction> {
        const transaction = new Transaction(transactionDTO);
        return transaction.save();
    }

    async updateTransaction(transactionDTO: UpdateTransactionDTO): Promise<ITransaction | null> {
        return Transaction.findByIdAndUpdate(transactionDTO.id, transactionDTO, { new: true }).exec();
    }

    async deleteTransaction(id: string): Promise<ITransaction | null> {
        return Transaction.findByIdAndDelete(id).exec();
    }
}