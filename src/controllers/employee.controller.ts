import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { EmployeeService } from '../services/employee.service';
import { parseQueryParams } from '../utils/parseQueryParams';

export class EmployeeController extends BaseController<any> {

  private employeeService: EmployeeService;

  constructor() {
    super();
    this.employeeService = new EmployeeService(); // instantiate service
  }


  async create(req: Request, res: Response): Promise<void> {
    try {
      const createdBy = req.user?.id  || 'system';
      const newEmployee = await this.employeeService.create(req.body, createdBy);

      // Fetch the newly created employee with role_name and company_name
      const employeeWithRelations = await this.employeeService.getById(newEmployee.id);
      this.sendSuccess(res, employeeWithRelations, 'Employee created', 201);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { page = '1', limit = '10', ...restQuery } = req.query;
      const filters = parseQueryParams(restQuery);

      const data = await this.employeeService.getAll(
        { page: Number(page), limit: Number(limit) },
        filters
      );

      this.sendSuccess(res, data, 'Employees fetched');
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const employee = await this.employeeService.getById(id);
      if (!employee) return this.sendError(res, { message: 'Employee not found' }, 404);
      this.sendSuccess(res, employee, 'Employee fetched');
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedBy = req.user?.id  || 'system';
      const updated = await this.employeeService.update(id, req.body, updatedBy);
      this.sendSuccess(res, updated, 'Employee updated');
    } catch (error) {
      this.sendError(res, error);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.employeeService.delete(id);
      this.sendSuccess(res, deleted, 'Employee deleted');
    } catch (error) {
      this.sendError(res, error);
    }
  }
}
