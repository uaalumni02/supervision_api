const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = Joi.object({
  numberOfAttendees: Joi.string().min(1).max(2).required(),
  date: Joi.number().required(),
  content: Joi.string().min(5).max(700).required(),
  isDeleted: Joi.boolean(),
  attendees: Joi.string().min(1).max(100).required(),
  units: Joi.objectId(),
  supervisionType: Joi.objectId(),
  approval: Joi.objectId(),
});

export default schema;
