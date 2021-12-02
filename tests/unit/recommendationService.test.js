import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';

const sut = recommendationService;

const mockRecommendationRepository = {
  findByYouTubeLink: () => jest.spyOn(recommendationRepository, 'findByYouTubeLink'),
  findById: () => jest.spyOn(recommendationRepository, 'findById'),
  findByScore: () => jest.spyOn(recommendationRepository, 'findByScore'),
  findAll: () => jest.spyOn(recommendationRepository, 'findAll'),
  findByLimit: () => jest.spyOn(recommendationRepository, 'findByLimit'),
  insert: () => jest.spyOn(recommendationRepository, 'insert'),
  vote: () => jest.spyOn(recommendationRepository, 'vote'),
  remove: () => jest.spyOn(recommendationRepository, 'remove'),
};

describe('Unit tests for RecommendationService.js', () => {
  beforeEach(() => {
    mockRecommendationRepository.findByYouTubeLink().mockReset();
    mockRecommendationRepository.findById().mockReset();
    mockRecommendationRepository.findByScore().mockReset();
    mockRecommendationRepository.findAll().mockReset();
    mockRecommendationRepository.findByLimit().mockReset();
    mockRecommendationRepository.insert().mockReset();
    mockRecommendationRepository.vote().mockReset();
    mockRecommendationRepository.remove().mockReset();
  });

  describe('Unit tests for post', () => {
    it('Should return an object with the inserted recommendation', async () => {
      jest.spyOn(recommendationRepository, 'insert').mockImplementationOnce(() => ({}));
      const result = await sut.post({ name: '', youtubeLink: '' });
      expect(result).toEqual({});
    });
  });
});
