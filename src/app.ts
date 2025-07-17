import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { AuthRoutes } from './routes/auth.routes';
import { EmployeeRoutes } from './routes/employee.routes';
import { errorHandler } from './middlewares/errorHandler';
import { CompanyRoutes } from './routes/company.routes';
import { RoleRoutes } from './routes/role.routes';
import { CanteenRoutes } from './routes/canteen.routes';
import { CanteenMenuRoutes } from './routes/canteenMenu.routes';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Instantiate route classes
const authRoutes = new AuthRoutes();
const employeeRoutes = new EmployeeRoutes();
const companyRoutes = new CompanyRoutes();
const roleRoutes = new RoleRoutes();
const canteenRoutes = new CanteenRoutes();
const canteenMenuRoutes = new CanteenMenuRoutes();


// Routes
app.use('/api/auth', authRoutes.router);
app.use('/api/employees', employeeRoutes.router);
app.use('/api/companies', companyRoutes.router);
app.use('/api/roles', roleRoutes.router);
app.use('/api/canteens', canteenRoutes.router);
app.use('/api/canteen-menus', canteenMenuRoutes.router);

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

export default app;
