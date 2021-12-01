import { Router } from 'express';
import recommendationRouter from './routes/recommendation.route.js';

const router = Router();

router.use('/', recommendationRouter);

export default router;
