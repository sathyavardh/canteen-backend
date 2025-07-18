import { prismaDb } from '../config/database';

export class RoleService {
  async create(data: any, createdBy: string) {
    const existingRole = await prismaDb.role.findUnique({
      where: {
        role_name: data.role_name, // Assuming 'name' is the unique field for role
      },
    });

    if (existingRole) {
      throw new Error(`Role with name '${data.name}' already exists.`);
    }
    return prismaDb.role.create({
      data: {
        ...data,
        created_by: createdBy,
      },
    });
  }


  async getAll(pagination: { page: number; limit: number }, filters: Record<string, any>) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [roles, total] = await Promise.all([
      prismaDb.role.findMany({

        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      prismaDb.role.count({}),
    ]);

    return { roles, total };
  }

  async getById(id: string) {
    return prismaDb.role.findUnique({ where: { id } });
  }

  async update(id: string, data: any, updatedBy: string) {
    const updated_at = new Date();
    return prismaDb.role.update({
      where: { id },
      data: {
        ...data,
        updated_by: updatedBy, 
        updated_at
      },
    });
  }

  async delete(id: string) {
    return prismaDb.role.delete({ where: { id } });
  }
}