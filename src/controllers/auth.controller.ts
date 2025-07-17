import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { AuthService } from '../services/auth.service';

export class AuthController extends BaseController<any> {

    private authService: AuthService;
  
    constructor() {
      super();
      this.authService = new AuthService(); // instantiate service
    }
  async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.authService.login(req.body);
      this.sendSuccess(res, { token }, 'Login successful');
    } catch (error) {
      this.sendError(res, error, 401);
    }
  }
}
