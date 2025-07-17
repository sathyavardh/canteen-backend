import { Router } from 'express';
import { CanteenMenuController } from '../controllers/canteenMenu.controller';
import { validate } from '../middlewares/validate';
import { authenticate } from '../middlewares/authenticate';
import { authorizeRole } from '../middlewares/authorizeRole';
import { createCanteenMenuSchema, updateCanteenMenuSchema } from '../validation/schemas/canteenMenu.schema';

export class CanteenMenuRoutes {
    public router: Router;
    private canteenMenuController: CanteenMenuController;

    constructor() {
        this.router = Router();
        this.canteenMenuController = new CanteenMenuController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authenticate);

        this.router.post(
            '/',
            authorizeRole('Admin'),
            validate(createCanteenMenuSchema),
            (req, res) => this.canteenMenuController.create(req, res)
        );

        this.router.get(
            '/',
            authorizeRole('Admin', 'Manager'),
            (req, res) => this.canteenMenuController.getAll(req, res)
        );

        this.router.get('/:id', (req, res) => this.canteenMenuController.getById(req, res));

        this.router.put(
            '/:id',
            authorizeRole('Admin'),
            validate(updateCanteenMenuSchema),
            (req, res) => this.canteenMenuController.update(req, res)
        );

        this.router.delete(
            '/:id',
            authorizeRole('Admin'),
            (req, res) => this.canteenMenuController.delete(req, res)
        );
    }
}
