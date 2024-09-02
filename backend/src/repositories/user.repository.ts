import { injectable } from "inversify";
import { IUser, User } from "../models/user.model";
import { CreateUserDTO, UpdateUserDTO } from "../DTOs/user.dto";

export interface UserRepository {
    getUserById(id: number): Promise<IUser | null>;
    signUp(userDTO: CreateUserDTO): Promise<IUser>;
    updateUser(userDTO: UpdateUserDTO): Promise<IUser | null>;
    deleteUser(id: number): Promise<IUser | null>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async getUserById(id: number): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    async signUp(userDTO: CreateUserDTO): Promise<IUser> {
        return User.create(userDTO);
    }

    async updateUser(userDTO: UpdateUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(userDTO.id, userDTO, { new: true }).exec();
    }

    async deleteUser(id: number): Promise<IUser | null> {
        return User.findByIdAndDelete(id).exec();
    }   
}