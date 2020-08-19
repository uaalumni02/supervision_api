const Joi = require("@hapi/joi");

const schema = Joi.object({
  unit: Joi.string().regex(/^([0-9]{2})+$/i),
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/i),
});

export default schema;
