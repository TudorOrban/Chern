import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../models/user.model";
import TYPES from "../config/types";
import { CreateUserDTO, UpdateUserDTO, UserDetailsDTO } from "../DTOs/user.dto";

export interface UserService {
    getUserById(id: number): Promise<UserDetailsDTO | null>;
    signUp(userDTO: CreateUserDTO): Promise<UserDetailsDTO>;
    updateUser(userDTO: UpdateUserDTO): Promise<UserDetailsDTO | null>;
    deleteUser(id: number): Promise<UserDetailsDTO | null>;
}

@injectable()
export class UserServiceImpl implements UserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    async getUserById(id: number): Promise<UserDetailsDTO | null> {
        return this.userRepository.getUserById(id)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    async signUp(userDTO: CreateUserDTO): Promise<UserDetailsDTO> {
        return this.userRepository.signUp(userDTO)
            .then((user: IUser) => this.mapUserToUserDetails(user));
    }

    async updateUser(userDTO: UpdateUserDTO): Promise<UserDetailsDTO | null> {
        return this.userRepository.updateUser(userDTO)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    async deleteUser(id: number): Promise<UserDetailsDTO | null> {
        return this.userRepository.deleteUser(id)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    private mapUserToUserDetails(user: IUser): UserDetailsDTO {
        return {
            id: user.id,
            email: user.email,
            username: user.username
        };
    }


}