/* eslint-disable max-len */
import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';
import * as randomFunctions from '../../src/utils/randomFunctions.js';

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

const mockRandomFunctions = {
  randomScore: () => jest.spyOn(randomFunctions, 'randomScore'),
  randomRecommendation: () => jest.spyOn(randomFunctions, 'randomRecommendation'),
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

    it('Should return an error by conflict between links', async () => {
      mockRecommendationRepository.findByYouTubeLink().mockImplementationOnce(() => ({ youtubeLink: '' }));
      try {
        await sut.post({ name: '', youtubeLink: '' });
      } catch (error) {
        expect(error.name).toEqual('Conflict');
      }
    });
  });

  describe('Unit tests for upvote function', () => {
    it('Should return an object with the updated recommendation', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      mockRecommendationRepository.vote().mockImplementationOnce(() => ({ object: true }));
      const result = await sut.upvote({ id: 1 });
      expect(result).toEqual({ object: true });
    });

    it('Should return an error: recommendation not found', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => null);
      try {
        await sut.upvote({ id: 1 });
      } catch (error) {
        expect(error.name).toEqual('NotFound');
      }
    });
  });

  describe('Unit tests for downvote function', () => {
    it('Should return success if the returned score is -4', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      mockRecommendationRepository.vote().mockReturnValueOnce({ score: -4 });
      const result = await sut.downvote({ id: 1 });
      expect(result).toEqual({ score: -4 });
    });

    it('Should return success if the returned score is -5', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      mockRecommendationRepository.vote().mockReturnValueOnce({ score: -5 });
      const result = await sut.downvote({ id: 1 });
      expect(result).toEqual({ score: -5 });
    });

    it('Should return not found error if the returned score is -6', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => ({ id: 1 }));
      mockRecommendationRepository.vote().mockReturnValueOnce({ score: -6 });
      try {
        await sut.downvote({ id: 1 });
      } catch (error) {
        expect(error.name).toEqual('NotFound');
      }
    });

    it('Should return an error: recommendation not found', async () => {
      mockRecommendationRepository.findById().mockImplementationOnce(() => null);
      try {
        await sut.downvote({ id: 1 });
      } catch (error) {
        expect(error.name).toEqual('NotFound');
      }
    });
  });

  describe('Unit tests for get function', () => {
    it('Should return one random recomendation between all recommendations', async () => {
      mockRecommendationRepository.findByScore(mockRandomFunctions.randomScore(7)).mockImplementationOnce(() => null);
      mockRecommendationRepository.findAll().mockImplementationOnce(() => [{ object: 'random' }]);
      mockRandomFunctions.randomRecommendation([{ object: 'random' }]).mockImplementationOnce(() => ({ object: 'random' }));
      const result = await sut.get();
      expect(result).toEqual({ object: 'random' });
    });
  });
});
