import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CompanyService } from '../services/company.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class CompanyController extends BaseController<any> {
    private companyService: CompanyService;

    constructor() {
        super();
        this.companyService = new CompanyService(); // instantiate service
    }
    async create(req: Request, res: Response): Promise<void> {
        try {
            console.log('CompanyController.create called'); // <-- Add this
            const createdBy = req.user?.id  || 'system';
            console.log('req', req.body); // <-- Add this
            const company = await this.companyService.create(req.body, createdBy);
            this.sendSuccess(res, company, 'Company created', 201);
        } catch (error) {
            console.error('Error in CompanyController.create:', error);
            this.sendError(res, error);
        }
    }


    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.companyService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'Companys fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const company = await this.companyService.getById(id);
            if (!company) return this.sendError(res, { message: 'Company not found' }, 404);
            this.sendSuccess(res, company, 'Company fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updated_by = req.user?.id  || 'system';
            const updated = await this.companyService.update(id, req.body, updated_by);
            this.sendSuccess(res, updated, 'Company updated');
        } catch (error) {
            this.sendError(res, error);
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deleted = await this.companyService.delete(id);
            this.sendSuccess(res, deleted, 'Company deleted');
        } catch (error) {
            this.sendError(res, error);
        }
    }
}
