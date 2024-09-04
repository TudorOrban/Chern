import { Container } from "inversify";
import { UserRepository, UserRepositoryImpl } from "../repositories/user.repository";
import { UserService, UserServiceImpl } from "../services/user.service";
import TYPES from "./types";
import { UserController } from "../controllers/user.controller";
import { JWTService, JWTServiceImpl } from "../services/jwt.service";
import { SecurityService, SecurityServiceImpl } from "../services/security.service";
import { TransactionRepository, TransactionRepositoryImpl } from "../repositories/transaction.repository";
import { TransactionService, TransactionServiceImpl } from "../services/transaction.service";
import { TransactionController } from "../controllers/transaction.controller";
import { SanitizationService, SanitizationServiceImpl } from "../services/sanitization.service";


const container = new Container({ defaultScope: "Singleton" });
container.bind<JWTService>(TYPES.JwtService).to(JWTServiceImpl);
container.bind<SecurityService>(TYPES.SecurityService).to(SecurityServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<TransactionRepository>(TYPES.TransactionRepository).to(TransactionRepositoryImpl);
container.bind<TransactionService>(TYPES.TransactionService).to(TransactionServiceImpl);
container.bind<TransactionController>(TYPES.TransactionController).to(TransactionController);

// Utils
container.bind<SanitizationService>(TYPES.SanitizationService).to(SanitizationServiceImpl);

export default container;