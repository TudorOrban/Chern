import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../models/user.model";
import TYPES from "../config/types";
import { CreateUserDTO, UpdateUserDTO, UserDetailsDTO } from "../DTOs/user.dto";
import bcrypt from 'bcrypt';

export interface UserService {
    getUserById(id: number): Promise<UserDetailsDTO | null>;
    getUserByEmail(email: string): Promise<UserDetailsDTO | null>;
    validateCredentials(email: string, password: string): Promise<IUser | null>;
    signUp(userDTO: CreateUserDTO): Promise<UserDetailsDTO>;
    updateUser(userDTO: UpdateUserDTO): Promise<UserDetailsDTO | null>;
    deleteUser(id: number): Promise<UserDetailsDTO | null>;
}

@injectable()
export class UserServiceImpl implements UserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository
    ) {}

    getUserById = async (id: number): Promise<UserDetailsDTO | null> => {
        return this.userRepository.findUserById(id)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    getUserByEmail = async (email: string): Promise<UserDetailsDTO | null> => {
        return this.userRepository.findUserByEmail(email)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    validateCredentials = async (email: string, password: string): Promise<IUser | null> => {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            return null;
        }

        const doesPasswordMatch = bcrypt.compare(password, user.passwordHash);
        if (!doesPasswordMatch) {
            return null;
        }

        return user;
    }

    signUp = async (userDTO: CreateUserDTO): Promise<UserDetailsDTO> => {
        const saltRounds = 10;
        try {
            // Hash password
            const passwordHash = await bcrypt.hash(userDTO.password, saltRounds);

            // Replace plain password with hash
            const newUserDTO = {
                ...userDTO,
                passwordHash: passwordHash
            };

            const user = await this.userRepository.signUp(newUserDTO);

            return this.mapUserToUserDetails(user);
        } catch (error) {
            throw new Error('Error signing up user: ' + error);
        }
    }

    updateUser = async (userDTO: UpdateUserDTO): Promise<UserDetailsDTO | null> => {
        return this.userRepository.updateUser(userDTO)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.mapUserToUserDetails(user);
            });
    }

    deleteUser = async (id: number): Promise<UserDetailsDTO | null> => {
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
            username: user.username,
            passwordHash: user?.passwordHash
        };
    }
}