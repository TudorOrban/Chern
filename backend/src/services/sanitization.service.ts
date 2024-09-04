import { injectable } from "inversify";
import sanitizeHtml from "sanitize-html";

export interface SanitizationService {
    sanitizeInput(input?: string): string | undefined;
}

@injectable()
export class SanitizationServiceImpl implements SanitizationService {
    private allowedTags = ['b', 'i', 'em', 'strong', 'a'];
    private allowedAttributes = {
        'a': ['href']
    };

    sanitizeInput = (input?: string): string | undefined => {
        if (!input) return undefined;
        
        return sanitizeHtml(input, {
            allowedTags: this.allowedTags,
            allowedAttributes: this.allowedAttributes,
            selfClosing: ['br', 'hr', 'area', 'base'],
            allowProtocolRelative: true
        });
    }
}