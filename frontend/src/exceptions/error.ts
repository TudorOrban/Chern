
export class StandardError extends Error {
    statusCode: number;
    
    constructor(name: string, message: string, statusCode: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}