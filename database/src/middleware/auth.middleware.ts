import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-this'

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    }
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
        res.status(401).json({ erro: 'Token de acesso não fornecido' })
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            email: string;
            role: string;
        }
        req.user = decoded
        next()
    } catch (error) {
        res.status(403).json({ erro: 'Token inválido ou expirado' })
        return
    }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ erro: 'Acesso de administrador necessário' })
        return
    }
    next()
}