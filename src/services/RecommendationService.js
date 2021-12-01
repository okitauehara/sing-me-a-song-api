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

    const checkRecommendation = await recommendationRepository.findById({ id });
    if (!checkRecommendation) throw new Error('Recommendation not found');
  }
}

export default RecommendationService;
