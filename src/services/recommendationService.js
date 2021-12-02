import * as recommendationRepository from '../repositories/recommendationRepository.js';
import { randomRecommendation, randomScore } from '../utils/randomFunctions.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';

async function post({ name, youtubeLink }) {
  const checkLink = await recommendationRepository.findByYouTubeLink({ youtubeLink });
  if (checkLink) throw new Conflict('Link already registered');

  const result = await recommendationRepository.insert({ name, youtubeLink });
  return result;
}

async function upvote({ id }) {
  const type = 'upvote';

  const checkRecommendation = await recommendationRepository.findById({ recommendationId: id });
  if (!checkRecommendation) throw new NotFound('Recommendation not found');

  const result = await recommendationRepository.vote({ type, recommendationId: id });

  return result;
}

async function downvote({ id }) {
  const type = 'downvote';

  const checkRecommendation = await recommendationRepository.findById({ recommendationId: id });
  if (!checkRecommendation) throw new NotFound('Recommendation not found');

  const result = await recommendationRepository.vote({ type, recommendationId: id });
  if (result.score < -5) {
    await recommendationRepository.remove({ recommendationId: id });
  }

  return result;
}

async function get() {
  const sortNumber = await randomScore();

  const getRows = await recommendationRepository.findByScore({ sortNumber });
  if (!getRows) {
    const getAllRows = await recommendationRepository.findAll();
    if (!getAllRows) throw new NotFound('No recommendations yet');
    const recommendation = await randomRecommendation(getAllRows);
    return recommendation;
  }
  const recommendation = await randomRecommendation(getRows);

  return recommendation;
}

async function getTop({ limit }) {
  if (limit <= 0) throw new Error('Invalid amount');

  const result = await recommendationRepository.findByLimit({ limit });
  if (!result.length) throw new NotFound('No recommendations yet');

  return result;
}

export {
  post,
  upvote,
  downvote,
  get,
  getTop,
};
