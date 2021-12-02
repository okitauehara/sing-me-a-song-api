import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import Conflict from '../../src/errors/Conflict.js';

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

  describe('Unit tests for post function', () => {
    it('Should return an object with the inserted recommendation', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => []);
      mockRecommendationRepository.insert().mockImplementationOnce(() => ({ id: 1 }));
      const result = await sut.post({ name: '', youtubeLink: '' });
      expect(result).toEqual({ id: 1 });
    });

    it('Should return an error by conflict between links', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      const result = sut.post({ name: '', youtubeLink: '' });
      expect(() => result.toThrow(Conflict));
    });
  });
});
