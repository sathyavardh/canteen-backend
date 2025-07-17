import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CanteenMenuService } from '../services/canteenMenu.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class CanteenMenuController extends BaseController<any> {
    private canteenMenuService: CanteenMenuService;

    constructor() {
        super();
        this.canteenMenuService = new CanteenMenuService(); // instantiate service
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('CanteenMenuController.create called'); // <-- Add this
            const createdBy = req.user?.id  || 'system';
            console.log('req', req.body); // <-- Add this
            const canteenMenu = await this.canteenMenuService.create(req.body, createdBy);
            this.sendSuccess(res, canteenMenu, 'CanteenMenu created', 201);
        } catch (error) {
            console.error('Error in CanteenMenuController.create:', error);
            this.sendError(res, error);
        }
    }


    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.canteenMenuService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'CanteenMenus fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const canteenMenu = await this.canteenMenuService.getById(id);
            if (!canteenMenu) return this.sendError(res, { message: 'CanteenMenu not found' }, 404);
            this.sendSuccess(res, canteenMenu, 'CanteenMenu fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updated_by = req.user?.id  || 'system';
            const updated = await this.canteenMenuService.update(id, req.body, updated_by);
            this.sendSuccess(res, updated, 'CanteenMenu updated');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.canteenMenuService.delete(id);
            this.sendSuccess(res, deleted, 'CanteenMenu deleted');
        } catch (error) {
            this.sendError(res, error);
        }
    }
}
