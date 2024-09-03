import { Request, Response, NextFunction } from "express"
import container from "../config/inversify.config"
import TYPES from "../config/types";
import { SecurityService } from "../services/security.service";


export const authorize = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const securityService = container.get<SecurityService>(TYPES.SecurityService);

        const userId = req.user?.id;
        const userEmail = req.user?.email;
        const requestedUserId = req.params.id || req.body.id;
        const requestedUserEmail = req.params.email;

        if (!userId || (!requestedUserId && !requestedUserEmail)) {
            return res.status(401).send("Access denied");
        }
        
        // Check access based on ID or Email
        if (requestedUserId && userId && !securityService.canAccessResource(requestedUserId, userId)) {
            return res.status(401).send("Access denied");
        }

        if (requestedUserEmail && userEmail !== requestedUserEmail) {
            return res.status(401).send("Access denied");
        }

        next();
    }
}