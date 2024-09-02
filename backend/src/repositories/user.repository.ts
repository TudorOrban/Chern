import { injectable } from "inversify";
import { IUser, User } from "../models/user.model";

export interface UserRepository {
    getUserById(id: number): Promise<IUser | null>;

}

@injectable()
export class UserRepositoryImpl implements UserRepository {

    async getUserById(id: number): Promise<IUser | null> {
        return User.findById(id).exec();
    }
}