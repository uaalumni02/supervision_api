const Joi = require("@hapi/joi");

const schema = Joi.object({
  supervisionType: Joi.string().min(4).max(13).required(),
});

export default schema;
