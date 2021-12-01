import recommendationSchema from '../schemas/recommendationSchema.js';
import RecommendationService from '../services/RecommendationService.js';

class RecommendationController {
  async postRecommendation(req, res) {
    const { name, youtubeLink } = req.body;
    const { reqBodyError } = recommendationSchema.validate({ name, youtubeLink });
    if (reqBodyError) return res.status(400).send(reqBodyError.details[0].message);

    try {
      const recommendationService = new RecommendationService();
      await recommendationService.post({ name, youtubeLink });
      return res.status(200).send({
        message: 'Successfully created!',
      });
    } catch (error) {
      if (error.message.includes('already')) return res.status(409).send(error.message);
      return res.status(500).send(error.message);
    }
  }
}

export default new RecommendationController();
