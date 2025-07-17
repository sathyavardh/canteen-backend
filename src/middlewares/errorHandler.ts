import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, _: Request, res: Response, __: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};
