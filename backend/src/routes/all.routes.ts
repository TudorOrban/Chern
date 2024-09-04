import { Router } from "express";
import container from "../config/inversify.config";
import TYPES from "../config/types";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/jwt.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { TransactionController } from "../controllers/transaction.controller";


export function registerRoutes(router: Router): void {
    registerUserRoutes(router);
    registerTransactionRoutes(router);
}

export function registerUserRoutes(router: Router): void {
    const userController = container.get<UserController>(TYPES.UserController);
    
    // Public routes
    router.post("/login", userController.login);
    router.post("/sign-up", userController.signUp);    

    // Protected routes
    router.get("/users/:id", authenticateJWT, authorize(), userController.getUserById);
    router.get("/users/email/:email", authenticateJWT, authorize(), userController.getUserByEmail);
    router.get("/users/token/:token", userController.getUserByToken);
    router.put("/users", authenticateJWT, authorize(), userController.updateUser);
    router.delete("/users/:id", authenticateJWT, authorize(), userController.deleteUser);
}

export function registerTransactionRoutes(router: Router): void {
    const transactionController = container.get<TransactionController>(TYPES.TransactionController);
    
    router.get("/transactions/:id", transactionController.getTransactionById);
    router.get("/transactions/user/:userId", transactionController.getTransactionsByUserId);
    router.post("/transactions", transactionController.createTransaction);
    router.post("/transactions/bulk", transactionController.createTransactionsInBulk);
    router.put("/transactions", transactionController.updateTransaction);
    router.put("/transactions/bulk", transactionController.updateTransactionsInBulk);
    router.delete("/transactions/:id", transactionController.deleteTransaction);
}