import { prismaDb } from '../config/database';
import { hash } from '../utils/hash';

export class EmployeeService {

  async create(data: any, createdBy: string) {
    const {
      employee_email,
      employee_password,
      employee_role_id,
      employee_company_id,
      ...rest
    } = data;

    // 1. Check if email already exists
    const existingEmployee = await prismaDb.employee.findUnique({
      where: { employee_email },
    });

    if (existingEmployee) {
      throw new Error('Email already in use');
    }

    // 2. Check if role exists
    const roleExists = await prismaDb.role.findUnique({
      where: { id: employee_role_id },
    });

    if (!roleExists) {
      throw new Error('Invalid employee_role_id: Role not found');
    }

    // 3. Check if company exists     
    const companyExists = await prismaDb.company.findUnique({
      where: { id: employee_company_id },
    });

    if (!companyExists) {
      throw new Error('Invalid employee_company_id: Company not found');
    }

    // 4. Hash the password
    const hashedPassword = await hash(employee_password);

    // 5. Create employee with relation connections
    return prismaDb.employee.create({
      data: {
        ...rest,
        employee_email,
        employee_password: hashedPassword,
        isActive: true,
        joining_date: new Date(),
        created_by: createdBy,
        employee_role: {
          connect: {
            id: employee_role_id,
          },
        },
        employee_company: {
          connect: {
            id: employee_company_id,
          },
        },
      },
    });
  }


  async getAll(pagination: { page: number; limit: number }, filters: Record<string, any>) {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;



    const [employees, total] = await Promise.all([
      prismaDb.employee.findMany({

        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: {
          employee_role: {
            select: {
              role_name: true,
            },
          },      // Include related role
          employee_company: true,   // Include related company
        },
      }),
      prismaDb.employee.count(),
    ]);

    return { employees, total };
  }

  async getById(id: string) {
    return prismaDb.employee.findUnique({
      where: { id }, include: {
        employee_role: {
          select: {
            role_name: true,
          },
        },      // Include related role
        employee_company: true,   // Include related company
      },
    });
  }

  async update(id: string, data: any, updatedBy: string) {
    if (data.employee_password) {
      data.employee_password = await hash(data.employee_password);
    }

    const updated_at = new Date();

    return prismaDb.employee.update({
      where: { id },
      data: {
        ...data,
        updated_by: updatedBy, // use updated_by (not updatedBy)
        updated_at
      },
    });
  }

  async delete(id: string) {
    return prismaDb.employee.delete({ where: { id } });
  }
}
