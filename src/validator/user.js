import user from "../models/user";

const Joi = require("@hapi/joi");

const schema = Joi.object({
  username: Joi.string()
    // .regex(/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/i)
    .min(3)
    .max(30),
  // .required(),
  firstName: Joi.string()
    .regex(/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/)
    .min(3)
    .max(15),
  // .required(),
  lastName: Joi.string()
    .regex(/^([A-Za-z]+[,.]?[ ]?|[A-Za-z]+['-]?)+$/)
    .min(3)
    .max(15),
  // .required(),
  email: Joi.string()
    .regex(/[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/)
    .min(3)
    .max(30),
  // .required(),
  password: Joi.string().min(3).max(15).required(),
  //add required back to confirm pswd
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),

  id: Joi.string().regex(/^[0-9a-zA-Z]{24}$/i),
});

//may need separate validator for register as it requires more fields

export default schema;
