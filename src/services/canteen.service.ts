import { prismaDb } from '../config/database';

export class CanteenService {
    async create(data: any, createdBy: string) {
        const created_at = new Date();
        return prismaDb.canteen.create({
            data: {
                ...data,
                created_at,
                created_by: createdBy
            },
        });
    }
    async getAll(pagination: { page: number; limit: number }, filters: Record<string, any>) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const [canteens, total] = await Promise.all([
            prismaDb.canteen.findMany({

                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
            }),
            prismaDb.canteen.count(),
        ]);

        return { canteens, total };
    }

    async getById(id: string) {
        return prismaDb.canteen.findUnique({ where: { id } });
    }

    async update(id: string, data: any, updatedBy: string) {
        const updated_at = new Date();
        return prismaDb.canteen.update({
            where: { id },
            data: {
                ...data,
                updated_by: updatedBy, // use updated_by (not updatedBy)
                updated_at
            },
        });
    }

    async delete(id: string) {
        return prismaDb.canteen.delete({ where: { id } });
    }
}