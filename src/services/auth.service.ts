import { prismaDb } from '../config/database';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/jwt';
import { UnauthorizedError } from '../utils/customErrors';

export class AuthService {
  async login({ email, password }: { email: string; password: string }) {
    console.log('Login attempt:', { email });

    const user = await prismaDb.employee.findUnique({
      where: { employee_email: email },
      include: {
        employee_role: true,
        employee_company: true,
      },
    });

    if (!user?.employee_password) {
      console.log('User not found or no password set');
      throw new UnauthorizedError('Invalid credentials');
    }

    console.log('Found User:', user.employee_email);

    const isMatch = await compare(password.trim(), user.employee_password.trim());
    console.log('Comparing:', password.trim(), 'with hash:', user.employee_password.trim());
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.employee_email,
        role: user.employee_role?.role_name,
        company: user.employee_company?.company_name,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.employee_name,
        email: user.employee_email,
        role: {
          id: user.employee_role_id,
          name: user.employee_role?.role_name,
        },
        company: {
          id: user.employee_company_id,
          name: user.employee_company?.company_name,
        },
      },
    };
  }
}
