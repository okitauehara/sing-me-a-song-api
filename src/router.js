import { Router } from 'express';
import recommendationRouter from './routers/recommendation.router.js';

const router = new Router();

router.use('/recommendations', recommendationRouter);

export default router;
