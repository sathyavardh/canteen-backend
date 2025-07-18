import { Router } from 'express';
import { CompanyPaymentToCanteenController } from '../controllers/companyPaymentToCanteen.controller';
import { authenticate } from '../middlewares/authenticate';
import { authorizeRole } from '../middlewares/authorizeRole';

export class CompanyPaymentToCanteenRoutes {
    public router: Router;
    private companyPaymentToCanteenController: CompanyPaymentToCanteenController;

    constructor() {
        this.router = Router();
        this.companyPaymentToCanteenController = new CompanyPaymentToCanteenController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(authenticate);

        this.router.get(
            '/:id',
            authorizeRole('Admin', 'Employee'),
            (req, res) => this.companyPaymentToCanteenController.getById(req, res)
        );

        this.router.get(
            '/',
            authorizeRole('Admin', 'Employee'),
            (req, res) => this.companyPaymentToCanteenController.getAll(req, res)
        );
    }
}