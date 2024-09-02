import { inject, injectable } from "inversify";
import { UserService } from "../services/user.service";
import TYPES from "../config/types";
import { Request, Response, NextFunction } from 'express';

@injectable()
export class UserController {
    
    constructor(
        @inject(TYPES.UserService) private userService: UserService
    ) {
        console.log("UserController created with userService: ", userService);
    }

    public async getUserById(req: Request, res: Response, next: NextFunction): Promise<void>  {
        try {
            const id = parseInt(req.params.id);

            const user = await this.userService.getUserById(id);
            if (!user) {
                res.status(404).send("User not found");
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await this.userService.signUp(req.body);
            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await this.userService.updateUser(req.body);
            if (!user) {
                res.status(404).send("User not found");
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const user = await this.userService.deleteUser(id);
            if (!user) {
                res.status(404).send("User not found");
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}