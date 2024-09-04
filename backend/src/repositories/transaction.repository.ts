import { injectable } from "inversify";
import { ITransaction, Transaction } from "../models/transaction.model";
import { CreateTransactionDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";
import { StandardError } from "../exceptions/error";


export interface TransactionRepository {
    findTransactionById(id: string): Promise<ITransaction | null>;
    findTransactionsByUserId(userId: string): Promise<ITransaction[]>;
    createTransaction(transactionDTI: CreateTransactionDTO): Promise<ITransaction>;
    createTransactionsInBulk(transactionsDTO: CreateTransactionDTO[]): Promise<ITransaction[]>;
    updateTransaction(transactionDTO: UpdateTransactionDTO): Promise<ITransaction | null>;
    updateTransactionsInBulk(transactionsDTO: UpdateTransactionDTO[]): Promise<ITransaction[]>;
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

    async createTransactionsInBulk(transactionsDTO: CreateTransactionDTO[]): Promise<ITransaction[]> {
        return Transaction.insertMany(transactionsDTO);
    }

    async updateTransaction(transactionDTO: UpdateTransactionDTO): Promise<ITransaction | null> {
        return Transaction.findByIdAndUpdate(transactionDTO.id, transactionDTO, { new: true }).exec();
    }

    async updateTransactionsInBulk(transactionsDTO: UpdateTransactionDTO[]): Promise<ITransaction[]> {
        const bulkWriteOperations = transactionsDTO.map(transaction => {
            return {
                updateOne: {
                    filter: { _id: transaction.id },
                    update: { $set: transaction },
                },
            };
        });
    
        const result = await Transaction.bulkWrite(bulkWriteOperations);
        if (result.modifiedCount === 0) {
            throw new StandardError("Error updating transactions", "No transactions were updated.", 500);
        }
    
        // Fetch the updated documents based on their IDs
        const updatedTransactionIds = transactionsDTO.map(transaction => transaction.id);
        return Transaction.find({ _id: { $in: updatedTransactionIds } });
    }
    

    async deleteTransaction(id: string): Promise<ITransaction | null> {
        return Transaction.findByIdAndDelete(id).exec();
    }
}