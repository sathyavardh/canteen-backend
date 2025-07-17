import { prismaDb } from '../config/database';

export class CompanyService {
    async create(data: any, createdBy: string) {
        return prismaDb.company.create({
            data: {
                ...data,
                created_by: createdBy
            },
        });
    }

    async getAll(pagination: { page: number; limit: number }, filters: Record<string, any>) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const [companies, total] = await Promise.all([
            prismaDb.company.findMany({

                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prismaDb.company.count(),
        ]);

        return { companies, total };
    }

    async getById(id: string) {
        return prismaDb.company.findUnique({ where: { id } });
    }
    async update(id: string, data: any, updatedBy: string) {
        const updated_at = new Date();
        return prismaDb.company.update({
            where: { id },
            data: {
                ...data,
                updated_by: updatedBy, // use updated_by (not updatedBy)
                updated_at
            },
        });
    }
    async delete(id: string) {
        return prismaDb.company.delete({ where: { id } });
    }
}