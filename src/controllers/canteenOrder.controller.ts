import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CanteenOrderService } from '../services/canteenOrder.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class CanteenOrderController extends BaseController<any> {
    private canteenOrderService: CanteenOrderService;
    constructor() {
        super();
        this.canteenOrderService = new CanteenOrderService(); // instantiate service
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('CanteenOrderController.create called'); // <-- Add this
            const createdBy = req.user?.id || 'system';
            console.log('req', req.body); // <-- Add this
            const canteenOrder = await this.canteenOrderService.create(req.body, createdBy);
            this.sendSuccess(res, canteenOrder, 'CanteenOrder created', 201);
        } catch (error) {
            console.error('Error in CanteenOrderController.create:', error);
            this.sendError(res, error);
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.canteenOrderService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'CanteenOrders fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedBy = req
                .user?.id || 'system';
            const updated = await this.canteenOrderService.update(id, req.body
                , updatedBy);
            this.sendSuccess(res, updated, 'CanteenOrder updated');
        }
        catch (error) {
            console.error('Error in CanteenOrderController.update:', error);
            this.sendError(res, error);
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const canteenOrder = await this.canteenOrderService.getById(id);
            if (!canteenOrder) return this.sendError(res, { message: 'CanteenOrder not found' }, 404);
            this.sendSuccess(res, canteenOrder, 'CanteenOrder fetched');
        } catch (error) {
            console.error('Error in CanteenOrderController.getById:', error);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleteCanteenOrder = await this.canteenOrderService.delete(id);
            this.sendSuccess(res, deleteCanteenOrder, 'CanteenOrder deleted');
        } catch (error) {
            console.error('Error in CanteenOrderController.delete:', error);
            this.sendError(res, error);
        }
    }
}