import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const recommendationRouter = Router();

recommendationRouter.post('/recommendations', recommendationController.postRecommendation);
recommendationRouter.post('/recommendations/:id/upvote', recommendationController.postUpvote);
recommendationRouter.post('/recommendations/:id/downvote', recommendationController.postDownvote);
recommendationRouter.get('/recommendations/random', recommendationController.getRecommendation);
recommendationRouter.get('/recommendations/top/:amount', recommendationController.getTopRecommendations);

export default recommendationRouter;
