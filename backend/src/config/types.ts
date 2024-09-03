

const TYPES = {
    JwtService: Symbol.for("JwtService"),
    SecurityService: Symbol.for("SecurityService"),
    UserRepository: Symbol.for("UserRepository"),
    UserService: Symbol.for("UserService"),
    UserController: Symbol.for("UserController")
}

export default TYPES;