import { prismaDb } from '../config/database';

export class CanteenMenuService {
    async create(data: any, createdBy: string) {
        const { menu_item_name, menu_item_price, menu_item_description, canteen_id } = data;

        const canteenExists = await prismaDb.canteen.findUnique({
            where: { id: canteen_id },
        });

        if (!canteenExists) {
            throw new Error('Invalid canteen_id: Canteen not found');
        }

        return prismaDb.canteenMenu.create({
            data: {
                menu_item_name,
                menu_item_price,
                menu_item_description,
                canteen: {
                    connect: { id: canteen_id },
                },
                created_by: createdBy,
            },
        });
    }


    async getAll(pagination: { page: number; limit: number }, filters: Record<string, any>) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        const [canteens, total] = await Promise.all([
            prismaDb.canteenMenu.findMany({
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    canteen: true // Include related menu items
                }
            }),
            prismaDb.canteen.count(),
        ]);

        return { canteens, total };
    }

    async getById(id: string) {
        return prismaDb.canteenMenu.findUnique({
            where: { id }, include: {
                canteen: true // Include related menu items
            }
        });
    }
    async update(id: string, data: any, updatedBy: string) {
        const updated_at = new Date();
        return prismaDb.canteenMenu.update({
            where: { id },
            data: {
                ...data,
                updated_by: updatedBy,
                updated_at
            },
            include: {
                canteen: true // Include related menu items
            }
        });
    }
    async delete(id: string) {
        return prismaDb.canteenMenu.delete({ where: { id } });
    }
}