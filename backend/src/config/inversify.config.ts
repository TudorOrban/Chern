import { Container } from "inversify";
import { UserRepository, UserRepositoryImpl } from "../repositories/user.repository";
import { UserService, UserServiceImpl } from "../services/user.service";
import TYPES from "./types";
import { UserController } from "../controllers/user.controller";


const container = new Container({ defaultScope: "Singleton" });
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserController>(TYPES.UserController).to(UserController);

export default container;