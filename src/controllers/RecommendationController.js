import recommendationSchema from '../schemas/recommendationSchema.js';
import recommendationIdSchema from '../schemas/recommendationIdSchema.js';
import * as recommendationService from '../services/recommendationService.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';

async function postRecommendation(req, res) {
  const { name, youtubeLink } = req.body;
  const { error } = recommendationSchema.validate({ name, youtubeLink });
  if (error) return res.status(400).send('The request body contains invalid elements');

  try {
    await recommendationService.post({ name, youtubeLink });
    return res.status(200).send({
      message: 'Successfully created!',
    });
  } catch (err) {
    if (err instanceof Conflict) return res.status(409).send(err.message);
    return res.status(500).send(`Error on Recommendations: Unable to post recommendation - ${err.message}`);
  }
}

async function postUpvote(req, res) {
  const { id } = req.params;
  const { error } = recommendationIdSchema.validate({ id });
  if (error) return res.status(400).send('Id is invalid');

  try {
    await recommendationService.upvote({ id });
    return res.status(200).send({
      message: 'Successfully updated! +1',
    });
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    return res.status(500).send(`Error on Recommendations: Unable to update recommendation - ${err.message}`);
  }
}

async function postDownvote(req, res) {
  const { id } = req.params;
  const { error } = recommendationIdSchema.validate({ id });
  if (error) return res.status(400).send('Id is invalid');

  try {
    await recommendationService.downvote({ id });
    return res.status(200).send({
      message: 'Successfully updated -1!',
    });
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    return res.status(500).send(`Error on Recommendations: Unable to update recommendation - ${err.message}`);
  }
}

async function getRecommendation(req, res) {
  try {
    const recommendation = await recommendationService.get();
    return res.status(200).send(recommendation);
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    return res.status(500).send(`Error on Recommendations: Unable to get recommendation - ${err.message}`);
  }
}

async function getTopRecommendations(req, res) {
  const { amount } = req.params;

  try {
    const recommendations = await recommendationService.getTop({ limit: amount });
    return res.status(200).send(recommendations);
  } catch (err) {
    if (err instanceof NotFound) return res.status(404).send(err.message);
    return res.status(500).send(`Error on Recommendations: Unable to get top recommendations - ${err.message}`);
  }
}

export {
  postRecommendation,
  postUpvote,
  postDownvote,
  getRecommendation,
  getTopRecommendations,
};
