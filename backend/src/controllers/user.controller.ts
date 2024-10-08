import { inject, injectable } from "inversify";
import { UserService } from "../services/user.service";
import { JWTService } from "../services/jwt.service";
import { BudgetCalculatorService } from "../services/budgetcalculator.service";
import TYPES from "../config/types";
import { Request, Response, NextFunction } from 'express';

@injectable()
export class UserController {
    
    constructor(
        @inject(TYPES.UserService) private userService: UserService,
        @inject(TYPES.JwtService) private jwtService: JWTService,
        @inject(TYPES.BudgetCalculatorService) private budgetCalculatorService: BudgetCalculatorService
    ) {}

    getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const user = await this.userService.getUserById(id);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    getUserByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const email = req.params.email;

            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    getUserByToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const token = req.params.token;

            const userId = this.jwtService.getUserIdFromToken(token);

            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }
            
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password } = req.body;

            const user = await this.userService.validateCredentials(email, password);
            if (!user) {
                res.status(401).send("Invalid credentials");
                return;
            }
            
            const tokenPayload = {
                id: user._id?.toString(),
                email: user.email
            }

            const token = this.jwtService.generateToken(tokenPayload, "1h");
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.userService.signUp(req.body);
            const tokenPayload = {
                id: user._id?.toString(),
                email: user.email
            }

            const token = this.jwtService.generateToken(tokenPayload, "1h");
            res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.userService.updateUser(req.body);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    refreshUserBudget = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const user = await this.budgetCalculatorService.calculateFinancialData(id);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const user = await this.userService.deleteUser(id);
            if (!user) {
                res.status(404).send("User not found");
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}