import { injectable } from "inversify";
import jwt from 'jsonwebtoken';

export interface JWTService {
    generateToken(payload: object, expiresIn: string | number): string;
    verifyToken(token: string): jwt.JwtPayload | string;
}

@injectable()
export class JWTServiceImpl implements JWTService {

    private readonly secretKey = process.env.JWT_SECRET || "qwoipssa";

    constructor() {}

    generateToken = (payload: object, expiresIn: string | number = "1h"): string => {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }

    verifyToken = (token: string): jwt.JwtPayload | string => {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Error verifying token: ' + error);
        }
    }
}