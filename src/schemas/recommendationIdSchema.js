import joi from 'joi';

const recommendationIdSchema = joi.object({
  id: joi.number().integer().min(1).required(),
});

export default recommendationIdSchema;
