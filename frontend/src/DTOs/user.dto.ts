export interface UserDetailsDTO {
    id: number;
    email: string;
    username: string;
    passwordHash?: string;
}

export interface CreateUserDTO {
    email: string;
    password: string;
    username: string;
    passwordHash?: string;
}

export interface UpdateUserDTO {
    id: number;
    email?: string;
    password?: string;
    username?: string;
}