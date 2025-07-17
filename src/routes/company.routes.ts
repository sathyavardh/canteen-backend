import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authorizeRole } from '../middlewares/authorizeRole';
import { createCompanySchema, updateCompanySchema } from '../validation/schemas/company.schema';

export class CompanyRoutes {
  public router: Router;
  private companyController: CompanyController;

  constructor() {
    this.router = Router();
    this.companyController = new CompanyController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authenticate);

    this.router.post(
      '/',
      authorizeRole('Admin'),
      validate(createCompanySchema),
      (req, res) => this.companyController.create(req, res)
    );

    this.router.get(
      '/',
      authorizeRole('Admin', 'Manager'),
      (req, res) => this.companyController.getAll(req, res)
    );

    this.router.get('/:id', (req, res) => this.companyController.getById(req, res));

    this.router.put(
      '/:id',
      authorizeRole('Admin'),
      validate(updateCompanySchema),
      (req, res) => this.companyController.update(req, res)
    );

    this.router.delete(
      '/:id',
      authorizeRole('Admin'),
      (req, res) => this.companyController.delete(req, res)
    );
  }
}
