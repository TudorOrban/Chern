import { Router } from "express";
import container from "../config/inversify.config";
import TYPES from "../config/types";
import { UserController } from "../controllers/user.controller";


export function registerRoutes(router: Router): void {
    registerUserRoutes(router);
}

export function registerUserRoutes(router: Router): void {
    const userController = container.get<UserController>(TYPES.UserController);
    
    console.log("Registering user routes");
    
    router.get("/users/:id", userController.getUserById);
    router.post("/users", userController.signUp);
    router.put("/users", userController.updateUser);
    router.delete("/users/:id", userController.deleteUser);
}