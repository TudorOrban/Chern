import { inject, injectable } from "inversify";
import { TransactionService } from "../services/transaction.service";
import TYPES from "../config/types";
import { Request, Response, NextFunction } from 'express';
import { CreateTransactionDTO, UpdateTransactionDTO } from "../DTOs/transaction.dto";
import { SearchParams } from "../models/search.model";

@injectable()
export class TransactionController {
    
    constructor(
        @inject(TYPES.TransactionService) private transactionService: TransactionService,
    ) {}

    getTransactionById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const transaction = await this.transactionService.getTransactionById(id);
            if (!transaction) {
                res.status(404).send("Transaction not found");
            }

            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }

    getTransactionsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.userId;

            const transactions = await this.transactionService.getTransactionsByUserId(userId);
            if (!transactions) {
                res.status(404).send("Transactions not found");
            }

            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    searchTransactionsByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.params.userId;
            const {
                searchQuery = '',
                sortBy = 'date', // Default sorting by date
                isDescending = false,
                page = 1,
                itemsPerPage = 10
            } = req.query;

            const params: SearchParams = {
                searchQuery: searchQuery.toString(),
                sortBy: sortBy.toString(),
                isDescending: isDescending === 'true', // Convert string to boolean
                page: parseInt(page.toString(), 10),
                itemsPerPage: parseInt(itemsPerPage.toString(), 10)
            };

            const transactions = await this.transactionService.searchTransactionsByUserId(userId, params);
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    createTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transactionDTO: CreateTransactionDTO = req.body;

            const transaction = await this.transactionService.createTransaction(transactionDTO);
            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }

    createTransactionsInBulk = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transactionsDTO: CreateTransactionDTO[] = req.body;

            const transactions = await this.transactionService.createTransactionsInBulk(transactionsDTO);
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    updateTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transactionDTO: UpdateTransactionDTO = req.body;

            const transaction = await this.transactionService.updateTransaction(transactionDTO);
            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }

    updateTransactionsInBulk = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const transactionsDTO: UpdateTransactionDTO[] = req.body;

            const transactions = await this.transactionService.updateTransactionsInBulk(transactionsDTO);
            res.json(transactions);
        } catch (error) {
            next(error);
        }
    }

    deleteTransaction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const transaction = await this.transactionService.deleteTransaction(id);
            res.json(transaction);
        } catch (error) {
            next(error);
        }
    }
}