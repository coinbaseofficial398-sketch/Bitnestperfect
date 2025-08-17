
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

// Simple in-memory user store (replace with database in production)
const users = new Map<string, { id: string; username: string; password: string; role: string }>();

// Default admin user
const defaultAdmin = {
  id: '1',
  username: 'admin',
  password: bcrypt.hashSync('bitnest2024!', 10),
  role: 'admin'
};
users.set('admin', defaultAdmin);

export interface AuthUser {
  id: string;
  username: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const createUser = async (username: string, password: string, role: string = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    id: Date.now().toString(),
    username,
    password: hashedPassword,
    role
  };
  users.set(username, user);
  return { id: user.id, username: user.username, role: user.role };
};

export const authenticateUser = async (username: string, password: string) => {
  const user = users.get(username);
  if (!user) return null;
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  
  return { id: user.id, username: user.username, role: user.role };
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const token = authHeader.substring(7);
  const user = users.get(token); // Simple token = username approach
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = { id: user.id, username: user.username, role: user.role };
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
