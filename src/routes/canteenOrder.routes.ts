import { Router } from 'express';
import { CanteenOrderController } from '../controllers/canteenOrder.controller';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authorizeRole } from '../middlewares/authorizeRole';
import { createCanteenOrderSchema, updateCanteenOrderSchema } from '../validation/schemas/canteenOrder.schema';

export class CanteenOrderRoutes {
    public router: Router;
    private canteenOrderController: CanteenOrderController;

    constructor() {
        this.router = Router();
        this.canteenOrderController = new CanteenOrderController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authenticate);

        this.router.post(
            '/',
            authorizeRole('Admin'),
            validate(createCanteenOrderSchema),
            (req, res) => this.canteenOrderController.create(req, res)
        );

        this.router.get(
            '/',
            authorizeRole('Admin', 'Employee'),
            (req, res) => this.canteenOrderController.getAll(req, res)
        );

        this.router.put(
            '/:id',
            authorizeRole('Admin'),
            validate(updateCanteenOrderSchema),
            (req, res) => this.canteenOrderController.update(req, res)
        );
        this.router.get(
            '/:id',
            authorizeRole('Admin', 'Employee'),
            (req, res) => this.canteenOrderController.getById(req, res)
        );
        this.router.delete(
            '/:id',
            authorizeRole('Admin'),
            (req, res) => this.canteenOrderController.delete(req, res)
        );
    }
}