import user from "../models/user";

const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string()
    .regex(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i)
    .min(3)
    .max(30)
    .required(),
  firstName: Joi.string()
    .regex(/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/)
    .min(3)
    .max(15)
    .required(),
  lastName: Joi.string()
    .regex(/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/)
    .min(3)
    .max(15)
    .required(),
  email: Joi.string()
    .regex(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/)
    .min(3)
    .max(30)
    .required(),
  password: Joi.string().min(3).max(15),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  id: Joi.string().regex(/^[0-9a-zA-Z]{24}$/i),
});

export default schema;
