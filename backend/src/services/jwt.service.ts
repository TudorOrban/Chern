import { injectable } from "inversify";
import jwt from 'jsonwebtoken';
import { StandardError } from "../exceptions/error";

export interface JWTService {
    generateToken(payload: object, expiresIn: string | number): string;
    verifyToken(token: string): jwt.JwtPayload | string;
    getUserIdFromToken(token: string): string;
}

@injectable()
export class JWTServiceImpl implements JWTService {

    private readonly secretKey = process.env.JWT_SECRET ?? "qwoipssa";

    constructor() {}

    generateToken = (payload: object, expiresIn: string | number = "1h"): string => {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    verifyToken = (token: string): jwt.JwtPayload | string => {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            const err = new StandardError("Unauthorized", "Error validating JWT token", 401);
            throw err;
        }
    }
    
    getUserIdFromToken = (token: string): string => {
        try {
            const decoded = jwt.verify(token, this.secretKey) as jwt.JwtPayload;
            return decoded.id as string;
        } catch (error) {
            throw new Error('Failed to decode token: ' + error);
        }
    }
}