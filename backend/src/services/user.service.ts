import { inject, injectable } from "inversify";
import { UserRepository } from "../repositories/user.repository";
import { DTOMapperService } from "./dtomapper.service";
import { IUser } from "../models/user.model";
import TYPES from "../config/types";
import { CreateUserDTO, UpdateUserDTO, UserDetailsDTO } from "../DTOs/user.dto";
import bcrypt from 'bcrypt';

export interface UserService {
    getUserById(id: string): Promise<UserDetailsDTO | null>;
    getUserByEmail(email: string): Promise<UserDetailsDTO | null>;
    validateCredentials(email: string, password: string): Promise<IUser | null>;
    signUp(userDTO: CreateUserDTO): Promise<IUser>;
    updateUser(userDTO: UpdateUserDTO): Promise<UserDetailsDTO | null>;
    deleteUser(id: string): Promise<UserDetailsDTO | null>;
}

@injectable()
export class UserServiceImpl implements UserService {

    constructor(
        @inject(TYPES.UserRepository) private userRepository: UserRepository,
        @inject(TYPES.DTOMapperService) private dtoMapperService: DTOMapperService,
    ) {}

    getUserById = async (id: string): Promise<UserDetailsDTO | null> => {
        return this.userRepository.findUserById(id)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.dtoMapperService.mapUserToUserDetails(user);
            });
    }

    getUserByEmail = async (email: string): Promise<UserDetailsDTO | null> => {
        return this.userRepository.findUserByEmail(email)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.dtoMapperService.mapUserToUserDetails(user);
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

    signUp = async (userDTO: CreateUserDTO): Promise<IUser> => {
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

            return user;
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
                return this.dtoMapperService.mapUserToUserDetails(user);
            });
    }

    deleteUser = async (id: string): Promise<UserDetailsDTO | null> => {
        return this.userRepository.deleteUser(id)
            .then((user: IUser | null) => {
                if (!user) {
                    return null;
                }
                return this.dtoMapperService.mapUserToUserDetails(user);
            });
    }

}