import { injectable } from "inversify";
import { IUser, User } from "../models/user.model";
import { CreateUserDTO, UpdateUserDTO } from "../DTOs/user.dto";

export interface UserRepository {
    findUserById(id: string): Promise<IUser | null>;
    findUserByEmail(email: string): Promise<IUser | null>;
    signUp(userDTO: CreateUserDTO): Promise<IUser>;
    updateUser(userDTO: UpdateUserDTO): Promise<IUser | null>;
    deleteUser(id: string): Promise<IUser | null>;
}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async findUserById(id: string): Promise<IUser | null> {
        return User.findById(id).exec();
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return User.findOne({ email }).exec();
    }

    async signUp(userDTO: CreateUserDTO): Promise<IUser> {
        const newUser = new User({
            email: userDTO.email,
            passwordHash: userDTO.passwordHash,
            username: userDTO.username
        });

        return newUser.save();
    }

    async updateUser(userDTO: UpdateUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(userDTO.id, userDTO, { new: true }).exec();
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return User.findByIdAndDelete(id).exec();
    }   
}