import { inject, injectable } from "inversify";
import { CreateTransactionDTO, TransactionDetailsDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";
import TYPES from "../config/types";
import { TransactionRepository } from "../repositories/transaction.repository";
import { ITransaction } from "../models/transaction.model";
import { PaginatedResults, SearchParams } from "../models/search.model";
import { SanitizationService } from "./sanitization.service";


export interface TransactionService {
    getTransactionById(transactionId: string): Promise<TransactionDetailsDTO | null>;
    getTransactionsByUserId(userId: string): Promise<TransactionDetailsDTO[]>;
    searchTransactionsByUserId(userId: string, params: SearchParams): Promise<PaginatedResults<TransactionDetailsDTO>>;
    createTransaction(transaction: CreateTransactionDTO): Promise<TransactionDetailsDTO | null>;
    createTransactionsInBulk(transactions: CreateTransactionDTO[]): Promise<TransactionDetailsDTO[]>;
    updateTransaction(transaction: UpdateTransactionDTO): Promise<TransactionDetailsDTO | null>;
    updateTransactionsInBulk(transactions: UpdateTransactionDTO[]): Promise<TransactionDetailsDTO[]>;
    deleteTransaction(transactionId: string): Promise<TransactionDetailsDTO | null>;
}

@injectable()
export class TransactionServiceImpl implements TransactionService {

    constructor(
        @inject(TYPES.TransactionRepository) private transactionRepository: TransactionRepository,
        @inject(TYPES.SanitizationService) private sanitizationService: SanitizationService,
    ) {}
    
    getTransactionById = async (transactionId: string): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.findTransactionById(transactionId)
            .then(this.mapTransactionToTransactionDetails);
    }

    getTransactionsByUserId = async (userId: string): Promise<TransactionDetailsDTO[]> => {
        return this.transactionRepository.findTransactionsByUserId(userId)
            .then((transactions: ITransaction[]) => transactions.map((transaction) => this.mapTransactionToTransactionDetails(transaction) as TransactionDetailsDTO));
    }

    searchTransactionsByUserId = async (userId: string, params: SearchParams): Promise<PaginatedResults<TransactionDetailsDTO>> => {
        const sanitizedParams = this.sanitizeSearchParams(params);
        return this.transactionRepository.searchTransactionsByUserId(userId, sanitizedParams)
            .then((paginatedResults: PaginatedResults<ITransaction>) => {
                return {
                    results: paginatedResults.results.map((transaction) => this.mapTransactionToTransactionDetails(transaction) as TransactionDetailsDTO),
                    totalCount: paginatedResults.totalCount
                };
            });
    }

    createTransaction = async (transactionDTO: CreateTransactionDTO): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.createTransaction(transactionDTO)
            .then(this.mapTransactionToTransactionDetails);
    }

    createTransactionsInBulk = async (transactionsDTO: CreateTransactionDTO[]): Promise<TransactionDetailsDTO[]> => {
        return this.transactionRepository.createTransactionsInBulk(transactionsDTO)
            .then((transactions: ITransaction[]) => transactions.map((transaction) => this.mapTransactionToTransactionDetails(transaction) as TransactionDetailsDTO));
    }

    updateTransaction = async (transactionDTO: UpdateTransactionDTO): Promise<TransactionDetailsDTO | null> => {
        return this.transactionRepository.updateTransaction(transactionDTO)
            .then(this.mapTransactionToTransactionDetails);
    }
    
    updateTransactionsInBulk = async (transactionsDTO: UpdateTransactionDTO[]): Promise<TransactionDetailsDTO[]> => {
        return this.transactionRepository.updateTransactionsInBulk(transactionsDTO)
            .then((transactions: ITransaction[]) => transactions.map((transaction) => this.mapTransactionToTransactionDetails(transaction) as TransactionDetailsDTO));
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

    private sanitizeSearchParams(params: SearchParams): SearchParams {
        return {
            searchQuery: this.sanitizationService.sanitizeInput(params.searchQuery) ?? "",
            sortBy: this.sanitizationService.sanitizeInput(params.sortBy) ?? "",
            isDescending: params.isDescending,
            page: params.page,
            itemsPerPage: params.itemsPerPage
        };
    }

}