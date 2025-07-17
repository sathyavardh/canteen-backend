import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { RoleService } from '../services/role.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class RoleController extends BaseController<any> {
    private roleService: RoleService;

    constructor() {
        super();
        this.roleService = new RoleService(); // instantiate service
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const createdBy = req.user?.id  || 'system';
            const role = await this.roleService.create(req.body, createdBy);
            this.sendSuccess(res, role, 'Role created', 201);
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.roleService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'Roles fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const role = await this.roleService.getById(id);
            if (!role) return this.sendError(res, { message: 'Role not found' }, 404);
            this.sendSuccess(res, role, 'Role fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedBy = req.user?.id  || 'system';
            const updated = await this.roleService.update(id, req.body, updatedBy);
            this.sendSuccess(res, updated, 'Role updated');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.roleService.delete(id);
            this.sendSuccess(res, deleted, 'Role deleted');
        } catch (error) {
            this.sendError(res, error);
        }
    }
    
}