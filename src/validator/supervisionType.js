const Joi = require("@hapi/joi");

const schema = Joi.object({
  supervisionType: Joi.string().min(4).max(13).required(),
  id: Joi.string().regex(
    /^[0-9a-fA-F]{24}$/i
  ),
});

export default schema;
/^[0-9a-fA-F]{24}$/i