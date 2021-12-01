import { Router } from 'express';
import recommendationRouter from './routers/recommendation.router.js';

const router = Router();

router.use('/', recommendationRouter);

export default router;
