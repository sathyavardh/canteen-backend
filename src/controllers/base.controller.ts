import { Response } from 'express';

export class BaseController<T> {
  sendSuccess(res: Response, data: T, message = 'Success', status = 200) {
    res.status(status).json({
      success: true,
      message,
      data,
    });
  }

  sendError(res: Response, error: any, status = 500) {
    console.error(error);
    res.status(status).json({
      success: false,
      message: error?.message || 'Internal Server Error',
    });
  }
}
