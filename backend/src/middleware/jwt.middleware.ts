import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            console.log("No token provided");
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.JWT_SECRET ?? "qwoipssa", (err, user) => {
            if (err) {
                console.log("JWT verification error:", err);
                return res.sendStatus(403);
            }

            req.user = user as JwtPayload;
            console.log("JWT decoded:", user);
            next();
        });
    } else {
        console.log("No authorization header found");
        res.sendStatus(401);
    }
}