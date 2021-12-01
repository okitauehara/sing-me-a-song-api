import recommendationSchema from '../schemas/recommendationSchema.js';
import recommendationIdSchema from '../schemas/recommendationIdSchema.js';
import RecommendationService from '../services/RecommendationService.js';

class RecommendationController {
  async postRecommendation(req, res) {
    const { name, youtubeLink } = req.body;
    const { reqBodyError } = recommendationSchema.validate({ name, youtubeLink });
    if (reqBodyError) return res.status(400).send('The request body contains invalid elements');

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.post({ name, youtubeLink });
      return res.status(200).send({
        message: 'Successfully created!',
      });
    } catch (error) {
      if (error.message.includes('already')) return res.status(409).send(error.message);
      return res.status(500).send(`Error on Recommendations: Unable to post recommendation - ${error.message}`);
    }
  }

  async postUpvote(req, res) {
    const { id } = req.params;
    const { reqParamsError } = recommendationIdSchema.validate({ id });
    if (reqParamsError) return res.status(400).send('Id is invalid');

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.upvote({ id });
      return res.status(200).send({
        message: 'Successfully updated!',
      });
    } catch (error) {
      if (error.message.includes('found')) return res.status(404).send(error.message);
      return res.status(500).send(`Error on Recommendations: Unable to update recommendation - ${error.message}`);
    }
  }
}

export default new RecommendationController();
