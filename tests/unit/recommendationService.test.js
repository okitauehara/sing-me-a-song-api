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

  describe('Unit tests for post function', () => {
    it('Should return an object with the inserted recommendation', async () => {
      mockRecommendationRepository.findByYouTubeLink().mockImplementationOnce(() => null);
      mockRecommendationRepository.insert().mockImplementationOnce(() => ({ object: true }));
      const result = await sut.post({ name: '', youtubeLink: '' });
      expect(result).toEqual({ object: true });
    });

    it('Should return an error by conflict between links', () => {
      mockRecommendationRepository.findByYouTubeLink().mockImplementationOnce(() => ({ youtubeLink: '' }));
      const result = sut.post({ name: '', youtubeLink: '' });
      expect(() => result.toThrow('Link already registered'));
    });
  });

  describe('Unit tests for upvote function', () => {
    it('Should return an object with the updated recommendation', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      mockRecommendationRepository.vote().mockImplementationOnce(() => ({ object: true }));
      const result = await sut.upvote({ id: 1 });
      expect(result).toEqual({ object: true });
    });
  });
});
