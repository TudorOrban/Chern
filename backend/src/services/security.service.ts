import { injectable } from "inversify";

export interface SecurityService {
    canAccessResource(requestedUserId: string, userId: string): boolean;
}

@injectable()
export class SecurityServiceImpl implements SecurityService {

    canAccessResource = (requestedUserId: string, userId: string): boolean => {
        return requestedUserId === userId;
    }
}