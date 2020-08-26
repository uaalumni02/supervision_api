const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string()
    .regex(/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().min(3).max(15),
  role: Joi.string().min(3).max(30),
  id: Joi.string().regex(/^[0-9a-zA-Z]{24}$/i),
});

export default schema;
