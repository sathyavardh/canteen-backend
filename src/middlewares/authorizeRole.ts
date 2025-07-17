// src/middlewares/authorizeRole.ts
import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req.user as any)?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions, For this role now allowed respected routes' });
    }

    next();
  };
};
