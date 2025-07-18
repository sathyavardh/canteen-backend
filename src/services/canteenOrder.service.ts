import { prismaDb } from '../config/database';

export class CanteenOrderService {
    // async create(data: any, createdBy: string) {
    //     const { canteen_menu_ids, ...rest } = data;

    //     if (!Array.isArray(canteen_menu_ids) || canteen_menu_ids.length === 0) {
    //         throw new Error("canteen_menu_ids must be a non-empty array");
    //     }

    //     // 1. Fetch all menu items to calculate total price
    //     const menus = await prismaDb.canteenMenu.findMany({
    //         where: {
    //             id: { in: canteen_menu_ids },
    //         },
    //     });

    //     console.log('Fetched menus:', menus); // Debugging log

    //     if (menus.length !== canteen_menu_ids.length) {
    //         throw new Error("Some menu items not found");
    //     }

    //     // 2. Calculate total price
    //     const totalPrice = menus.reduce((sum, menu) => sum + (menu.menu_item_price || 0), 0);

    //     // 3. Create Order + Join Table Entries
    //     return prismaDb.canteenOrder.create({
    //         data: {
    //             ...rest,
    //             total_price: totalPrice,
    //             created_by: createdBy,
    //             //junction table entries
    //             orderMenus: {
    //                 create: canteen_menu_ids.map((menuId: string) => ({
    //                     canteen_menu_id: menuId,
    //                 })),
    //             },
    //         },
    //         include: {
    //             orderMenus: {
    //                 include: {
    //                     canteen_menu: true,
    //                 },
    //             },
    //         },
    //     });
    // }


    async create(data: any, createdBy: string) {
        const { canteen_menu_ids, canteen_id, employee_id, ...rest } = data;

        if (!Array.isArray(canteen_menu_ids) || canteen_menu_ids.length === 0) {
            throw new Error("canteen_menu_ids must be a non-empty array");
        }

        // 1. Fetch employee to get company_id
        const employee = await prismaDb.employee.findUnique({
            where: { id: employee_id },
        });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const company_id = employee.employee_company_id;

        // 2. Fetch all menu items to calculate total price
        const menus = await prismaDb.canteenMenu.findMany({
            where: { id: { in: canteen_menu_ids } },
        });

        if (menus.length !== canteen_menu_ids.length) {
            throw new Error("Some menu items not found");
        }

        const totalPrice = menus.reduce((sum, menu) => sum + (menu.menu_item_price || 0), 0);

        // 3. Transaction block
        return await prismaDb.$transaction(async (tx) => {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);

            const existingPayment = await tx.companyPaymentToCanteen.findFirst({
                where: {
                    company_id,
                    canteen_id,
                    current_date: {
                        gte: todayStart,
                        lte: todayEnd,
                    },
                },
            });

            if (existingPayment) {
                await tx.companyPaymentToCanteen.update({
                    where: { id: existingPayment.id },
                    data: {
                        total_amount: { increment: totalPrice },
                        updated_by: createdBy,
                    },
                });
            } else {
                await tx.companyPaymentToCanteen.create({
                    data: {
                        company_id,
                        canteen_id,
                        total_amount: totalPrice,
                        created_by: createdBy,
                    },
                });
            }

            // Create order with linked menu items
            return await tx.canteenOrder.create({
                data: {

                    total_price: totalPrice,
                    created_by: createdBy,
                    canteen: {
                        connect: { id: canteen_id },
                    },
                    employee: {
                        connect: { id: employee_id },
                    },

                    orderMenus: {
                        create: canteen_menu_ids.map((menuId: string) => ({
                            canteen_menu: {
                                connect: { id: menuId },
                            },
                        })),
                    },
                }
                ,
                include: {
                    orderMenus: {
                        include: {
                            canteen_menu: true,
                        },
                    },
                },
            });
        });
    }

    async getAll(pagination: { page: number; limit: number }, filters: any) {
        const { page, limit } = pagination;
        const skip = (page - 1) * limit;

        return prismaDb.canteenOrder.findMany({
            skip,
            take: limit,
            where: filters,
            include: {
                orderMenus: {
                    include: {
                        canteen_menu: true, // correct relation path
                    },
                },
                canteen: true,  // Optional: include canteen details
                employee: true, // Optional: include employee details
            },
        });
    }

    async update(orderId: string, data: any, updatedBy: string) {
        const { canteen_menu_ids, ...rest } = data;

        if (!Array.isArray(canteen_menu_ids) || canteen_menu_ids.length === 0) {
            throw new Error("canteen_menu_ids must be a non-empty array");
        }

        // 1. Fetch the new menu items
        const menus = await prismaDb.canteenMenu.findMany({
            where: {
                id: { in: canteen_menu_ids },
            },
        });

        if (menus.length !== canteen_menu_ids.length) {
            throw new Error("Some menu items not found");
        }

        // 2. Calculate total price
        const totalPrice = menus.reduce((sum, menu) => sum + (menu.menu_item_price || 0), 0);

        // 3. Update order & replace old menus with new ones
        return prismaDb.canteenOrder.update({
            where: { id: orderId },
            data: {
                ...rest,
                total_price: totalPrice,
                updated_by: updatedBy,

                // Replace existing join table entries
                orderMenus: {
                    deleteMany: {}, // remove all existing
                    create: canteen_menu_ids.map((menuId: string) => ({
                        canteen_menu_id: menuId,
                    })),
                },
            },
            include: {
                orderMenus: {
                    include: {
                        canteen_menu: true,
                    },
                },
            },
        });
    }

    async getById(orderId: string) {
        return prismaDb.canteenOrder.findUnique({
            where: { id: orderId },
            include: {
                orderMenus: {
                    include: {
                        canteen_menu: true,
                    },
                },
                canteen: true,  // Optional: include canteen details
                employee: true, // Optional: include employee details
            },
        });
    }

    async delete(orderId: string) {
        return await prismaDb.$transaction(async (tx) => {
            // 1. Delete related order menu links
            await tx.canteenOrderMenu.deleteMany({
                where: { canteen_order_id: orderId },
            });

            // 2. Delete the order itself
            return await tx.canteenOrder.delete({
                where: { id: orderId },
            });
        });
    }


}
