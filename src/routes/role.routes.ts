import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';
import { validate } from '../middlewares/validate';
import { createRoleSchema, updateRoleSchema } from '../validation/schemas/role.schema';
import { authenticate } from '../middlewares/authenticate';

export class RoleRoutes {
    public router: Router;
    private roleController: RoleController;

    constructor() {
        this.router = Router();
        this.roleController = new RoleController();
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.use(authenticate);
        this.router.post(
            '/',
            validate(createRoleSchema),
            (req, res) => this.roleController.create(req, res)
        );

        this.router.get('/', (req, res) => this.roleController.getAll(req, res));
        this.router.get('/:id', (req, res) => this.roleController.getById(req, res));
        this.router.put(
            '/:id',
            validate(updateRoleSchema),
            (req, res) => this.roleController.update(req, res)
        );
        this.router.delete('/:id', (req, res) => this.roleController.delete(req, res));
    }
}
