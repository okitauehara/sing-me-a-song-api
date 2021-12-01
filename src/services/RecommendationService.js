import RecommendationRepository from '../repositories/RecommendationRepository.js';

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
}

export default RecommendationService;
