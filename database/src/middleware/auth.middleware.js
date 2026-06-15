import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key-change-this';
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) {
        res.status(401).json({ erro: 'Token de acesso não fornecido' });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({ erro: 'Token inválido ou expirado' });
        return;
    }
}
export function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        res.status(403).json({ erro: 'Acesso de administrador necessário' });
        return;
    }
    next();
}
//# sourceMappingURL=auth.middleware.js.map