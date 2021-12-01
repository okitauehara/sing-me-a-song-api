import RecommendationRepository from '../repositories/RecommendationRepository.js';
import { randomRecommendation, randomScore } from './RandomService.js';

class RecommendationService {
  async post({ name, youtubeLink }) {
    const recommendationRepository = new RecommendationRepository();

    const checkEmail = await recommendationRepository.findByYouTubeLink({ youtubeLink });
    if (checkEmail) throw new Error('Link already registered');

    const result = await recommendationRepository.insert({ name, youtubeLink });
    if (!result) throw new Error('Unable to insert');

    return result;
  }

  async upvote({ id }) {
    const recommendationRepository = new RecommendationRepository();
    const type = 'upvote';

    const checkRecommendation = await recommendationRepository.findById({ recommendationId: id });
    if (!checkRecommendation) throw new Error('Recommendation not found');

    const result = await recommendationRepository.vote({ type, recommendationId: id });
    if (!result) throw new Error('Unable to update vote');
  }

  async downvote({ id }) {
    const recommendationRepository = new RecommendationRepository();
    const type = 'downvote';

    const checkRecommendation = await recommendationRepository.findById({ recommendationId: id });
    if (!checkRecommendation) throw new Error('Recommendation not found');

    const result = await recommendationRepository.vote({ type, recommendationId: id });
    if (!result) throw new Error('Unable to update vote');

    if (result.score < -5) {
      await recommendationRepository.remove({ recommendationId: id });
    }

    return result;
  }

  async get() {
    const recommendationRepository = new RecommendationRepository();
    const sortNumber = await randomScore();

    const getRows = await recommendationRepository.findByScore({ sortNumber });
    if (!getRows.length) {
      const getAllRows = await recommendationRepository.findAll();
      if (!getAllRows.length) throw new Error('No recommendations yet');
      const recommendation = await randomRecommendation(getAllRows);
      return recommendation;
    }
    const recommendation = await randomRecommendation(getRows);

    return recommendation;
  }

  async getTop({ limit }) {
    const recommendationRepository = new RecommendationRepository();

    const result = await recommendationRepository.findByLimit({ limit });
    if (!result.length) throw new Error('No recommendations yet');

    return result;
  }
}

export default RecommendationService;
