import { Router } from "express";
import container from "../config/inversify.config";
import TYPES from "../config/types";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../middleware/jwt.middleware";
import { authorize } from "../middleware/authorize.middleware";


export function registerRoutes(router: Router): void {
    registerUserRoutes(router);
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