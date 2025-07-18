import { prismaDb } from '../config/database';

export class CompanyPaymentToCanteenService {
    async getById(companyId: string) {
        return prismaDb.companyPaymentToCanteen.findMany({
            where: { company_id: companyId },
        });
    }

    async getAll(pagination: { page: number; limit: number }, filters: any) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        return prismaDb.companyPaymentToCanteen.findMany({
            skip,
            take: limit,
            where: filters,
        });
    }
}