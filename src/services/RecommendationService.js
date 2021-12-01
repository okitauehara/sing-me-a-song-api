import RecommendationRepository from '../repositories/RecommendationRepository.js';

class RecommendationService {
  async post({ name, youtubeLink }) {
    const recommendationRepository = new RecommendationRepository();

    const checkEmail = await recommendationRepository.find({ youtubeLink });
    if (checkEmail) throw new Error('Link already registered');

    const result = await recommendationRepository.insert({ name, youtubeLink });
    if (!result) throw new Error('Unable to insert');

    return result;
  }
}

export default RecommendationService;
