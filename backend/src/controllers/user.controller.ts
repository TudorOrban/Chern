import { inject, injectable } from "inversify";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import TYPES from "../config/types";

@injectable()
export class UserController {
    constructor(
        @inject(TYPES.UserService) private userService: UserService
    ) {}

    public async getUserById(req: Request, res: Response): Promise<Response>  {
        try {
            const id = parseInt(req.params.id);

            const user = await this.userService.getUserById(id);
            if (!user) {
                res.status(404).send("User not found");
            }

            return res.json(user);
        } catch (error) {
            return res.status(500).send();
        }
    }
}