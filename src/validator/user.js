const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string()
    .regex(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().min(3).max(15),
  id: Joi.string().regex(/^[0-9a-zA-Z]{24}$/i),
});

export default schema;
