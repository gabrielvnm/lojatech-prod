import type { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}
export declare function authenticateToken(req: AuthRequest, res: Response, next: NextFunction): void;
export declare function requireAdmin(req: AuthRequest, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map