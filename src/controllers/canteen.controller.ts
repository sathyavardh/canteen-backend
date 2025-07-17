import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CanteenService } from '../services/canteen.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class CanteenController extends BaseController<any> {
    private canteenService: CanteenService;

    constructor() {
        super();
        this.canteenService = new CanteenService(); // instantiate service
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.user); 
            console.log('CanteenController.create called'); // <-- Add this
            const createdBy = req.user?.id || 'system';
            console.log('req', req.body); // <-- Add this
            const canteen = await this.canteenService.create(req.body, createdBy);
            this.sendSuccess(res, canteen, 'Canteen created', 201);
        } catch (error) {
            console.error('Error in CanteenController.create:', error);
            this.sendError(res, error);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.canteenService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'Canteens fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const canteen = await this.canteenService.getById(id);
            if (!canteen) return this.sendError(res, { message: 'Canteen not found' }, 404);
            this.sendSuccess(res, canteen, 'Canteen fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedBy = req.user?.id  || 'system';
            const updated = await this.canteenService.update(id, req.body, updatedBy);
            this.sendSuccess(res, updated, 'Canteen updated');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.canteenService.delete(id);
            this.sendSuccess(res, null, 'Canteen deleted');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    
}