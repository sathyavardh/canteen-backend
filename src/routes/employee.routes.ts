import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import {
  createEmployeeSchema,
  updateEmployeeSchema,
} from '../validation/schemas/employee.schema';

export class EmployeeRoutes {
  public router: Router;
  private employeeController: EmployeeController;

  constructor() {
    this.router = Router();
    this.employeeController = new EmployeeController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Apply `authenticate` to all routes except POST / (create user)
    this.router.post(
      '/',
      validate(createEmployeeSchema),
      (req, res) => this.employeeController.create(req, res)
    );

    // Authenticated routes
    this.router.use(authenticate);

    this.router.get('/', (req, res) => this.employeeController.getAll(req, res));
    this.router.get('/:id', (req, res) => this.employeeController.getById(req, res));
    this.router.put(
      '/:id',
      validate(updateEmployeeSchema),
      (req, res) => this.employeeController.update(req, res)
    );
    this.router.delete('/:id', (req, res) => this.employeeController.delete(req, res));
  }
}
