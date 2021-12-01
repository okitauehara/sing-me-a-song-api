import joi from 'joi';

const youtubeRegEx = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-_]*)(&(amp;)?‌​[\w?‌​=]*)?/;

const recommendationSchema = joi.object({
  name: joi.string().required(),
  youtubeLink: joi.string().pattern(youtubeRegEx).required(),
});

export default recommendationSchema;
