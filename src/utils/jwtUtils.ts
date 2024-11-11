import jwt from 'jsonwebtoken';

export const generateToken = (id: number, role: string): string => {
    return jwt.sign(
        { id, role },
        process.env['JWT_SECRET'] || 'your-secret-key',
        { expiresIn: '1h' }
    );
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env['JWT_SECRET'] || 'your-secret-key');
};
