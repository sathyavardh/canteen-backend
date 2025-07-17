import { Router } from 'express';
import { CanteenController } from '../controllers/canteen.controller';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authorizeRole } from '../middlewares/authorizeRole';
import { createCanteenSchema, updateCanteenSchema } from '../validation/schemas/canteen.schema';

export class CanteenRoutes {
  public router: Router;
  private canteenController: CanteenController;

  constructor() {
    this.router = Router();
    this.canteenController = new CanteenController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(authenticate);

    this.router.post(
      '/',
      authorizeRole('Admin'),
      validate(createCanteenSchema),
      (req, res) => this.canteenController.create(req, res)
    );

    this.router.get(
      '/',
      authorizeRole('Admin', 'Manager'),
      (req, res) => this.canteenController.getAll(req, res)
    );

    this.router.get('/:id', (req, res) => this.canteenController.getById(req, res));

    this.router.put(
      '/:id',
      authorizeRole('Admin'),
      validate(updateCanteenSchema),
      (req, res) => this.canteenController.update(req, res)
    );

    this.router.delete(
      '/:id',
      authorizeRole('Admin'),
      (req, res) => this.canteenController.delete(req, res)
    );
  }
}
