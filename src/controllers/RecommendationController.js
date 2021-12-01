import recommendationSchema from '../schemas/recommendationSchema.js';
import recommendationIdSchema from '../schemas/recommendationIdSchema.js';
import RecommendationService from '../services/RecommendationService.js';

class RecommendationController {
  async postRecommendation(req, res) {
    const { name, youtubeLink } = req.body;
    const { error } = recommendationSchema.validate({ name, youtubeLink });
    if (error) return res.status(400).send('The request body contains invalid elements');

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.post({ name, youtubeLink });
      return res.status(200).send({
        message: 'Successfully created!',
      });
    } catch (err) {
      if (err.message.includes('already')) return res.status(409).send(err.message);
      return res.status(500).send(`Error on Recommendations: Unable to post recommendation - ${err.message}`);
    }
  }

  async postUpvote(req, res) {
    const { id } = req.params;
    const { error } = recommendationIdSchema.validate({ id });
    if (error) return res.status(400).send('Id is invalid');

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.upvote({ id });
      return res.status(200).send({
        message: 'Successfully updated! +1',
      });
    } catch (err) {
      if (err.message.includes('found')) return res.status(404).send(err.message);
      return res.status(500).send(`Error on Recommendations: Unable to update recommendation - ${err.message}`);
    }
  }

  async postDownvote(req, res) {
    const { id } = req.params;
    const { error } = recommendationIdSchema.validate({ id });
    if (error) return res.status(400).send('Id is invalid');

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.downvote({ id });
      return res.status(200).send({
        message: 'Successfully updated -1!',
      });
    } catch (err) {
      if (err.message.includes('found')) return res.status(404).send(err.message);
      return res.status(500).send(`Error on Recommendations: Unable to update recommendation - ${err.message}`);
    }
  }

  async getRecommendation(req, res) {
    try {
      const recommendationService = new RecommendationService();
      const recommendation = await recommendationService.get();
      return res.status(200).send(recommendation);
    } catch (err) {
      if (err.message.includes('yet')) return res.status(409).send(err.message);
      return res.status(500).send(`Error on Recommendations: Unable to get recommendation - ${err.message}`);
    }
  }
}

export default new RecommendationController();
