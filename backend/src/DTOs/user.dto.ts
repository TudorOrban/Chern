export interface CreateUserDTO {
    email: string;
    password: string;
    username: string;
}

export interface UpdateUserDTO {
    id: number;
    email?: string;
    password?: string;
    username?: string;
}