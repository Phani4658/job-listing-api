import { Router, Request, Response } from 'express';
import { user } from './user.route';
import { job } from './job.route';
import { UserMiddleware } from '../middlewares';

const routes = Router();
const userMiddleware = new UserMiddleware();

// Home route
routes.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the API project!');
});

// API routes
routes.use('/api/user', user);
routes.use('/api/job', userMiddleware.validateToken ,job)

// With Middleware
// routes.use('/api/user', userMiddleware.validateToken, userMiddleware.hasAnyRole(['user', 'admin']), user);

export default routes;
