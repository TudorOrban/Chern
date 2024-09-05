const TYPES = {
    JwtService: Symbol.for("JwtService"),
    SecurityService: Symbol.for("SecurityService"),
    UserRepository: Symbol.for("UserRepository"),
    UserService: Symbol.for("UserService"),
    UserController: Symbol.for("UserController"),
    TransactionRepository: Symbol.for("TransactionRepository"),
    TransactionService: Symbol.for("TransactionService"),
    TransactionController: Symbol.for("TransactionController"),
    BudgetCalculatorService: Symbol.for("BudgetCalculatorService"),

    // Utils
    SanitizationService: Symbol.for("SanitizationService"),
}

export default TYPES;