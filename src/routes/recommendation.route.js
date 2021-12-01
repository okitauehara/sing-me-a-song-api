import { Router } from 'express';
import RecommendationController from '../controllers/RecommendationController.js';

const recommendationRouter = Router();

recommendationRouter.post('/recommendations', RecommendationController.postRecommendation);
recommendationRouter.post('/recommendations/:id/upvote', RecommendationController.postUpvote);

export default recommendationRouter;
