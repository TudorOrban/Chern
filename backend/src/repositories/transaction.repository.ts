import { injectable } from "inversify";
import { ITransaction, Transaction } from "../models/transaction.model";
import { CreateTransactionDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";
import { StandardError } from "../exceptions/error";
import { PaginatedResults, SearchParams } from "../models/search.model";


export interface TransactionRepository {
    findTransactionById(id: string): Promise<ITransaction | null>;
    findTransactionsByUserId(userId: string): Promise<ITransaction[]>;
    searchTransactionsByUserId(userId: string, params: SearchParams): Promise<PaginatedResults<ITransaction>>;
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

    async searchTransactionsByUserId(userId: string, params: SearchParams): Promise<PaginatedResults<ITransaction>> {
        const { searchQuery, sortBy, isDescending, page, itemsPerPage } = params;

        let query = Transaction.find({
            userId: userId,
            type: { $regex: searchQuery, $options: "i" },
        });

        const sortOrder = isDescending ? -1 : 1;
        const sortOptions = ["amount", "date"];
        if (sortOptions.includes(sortBy)) {
            query = query.sort({ [sortBy]: sortOrder });
        }

        const totalCount = await Transaction.countDocuments(query);
        query = query.skip((page - 1) * itemsPerPage).limit(itemsPerPage);

        const results = await query.exec();

        return {
            results,
            totalCount,
        };
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