import { Router } from 'express';
import RecommendationController from '../controllers/RecommendationController.js';

const recommendationRouter = Router();

recommendationRouter.post('/recommendations', RecommendationController.postRecommendation);

export default recommendationRouter;
