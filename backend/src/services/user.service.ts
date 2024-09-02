import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../models/user.model";
import TYPES from "../config/types";

export interface UserService {
    getUserById(id: number): Promise<IUser | null>;
}

@injectable()
export class UserServiceImpl implements UserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    async getUserById(id: number): Promise<IUser | null> {
        return this.userRepository.getUserById(id);
    }
}