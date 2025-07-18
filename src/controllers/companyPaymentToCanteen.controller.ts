import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { CompanyPaymentToCanteenService } from '../services/companyPaymentToCanteen.service';
import { parseQueryParams } from '../utils/parseQueryParams';


export class CompanyPaymentToCanteenController extends BaseController<any> {
    private companyPaymentToCanteenService: CompanyPaymentToCanteenService;

    constructor() {
        super();
        this.companyPaymentToCanteenService = new CompanyPaymentToCanteenService(); // instantiate service
    }

      async getById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const companyPaymentToCanteen = await this.companyPaymentToCanteenService.getById(id);
            if (!companyPaymentToCanteen) return this.sendError(res, { message: 'companyPaymentToCanteen not found' }, 404);
            this.sendSuccess(res, companyPaymentToCanteen, 'companyPaymentToCanteen fetched');
        } catch (error) {
            console.error('Error in companyPaymentToCanteen.getById:', error);
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = '1', limit = '10', ...restQuery } = req.query;
            const filters = parseQueryParams(restQuery);

            const data = await this.companyPaymentToCanteenService.getAll(
                { page: Number(page), limit: Number(limit) },
                filters
            );

            this.sendSuccess(res, data, 'companyPaymentsToCanteen fetched');
        } catch (error) {
            this.sendError(res, error);
        }
    }
}


