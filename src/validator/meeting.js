const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const schema = Joi.object({
  numberOfAttendees: Joi.number().min(1).max(2),
  date: Joi.number(),
  content: Joi.string().min(5).max(700),
  isDeleted: Joi.boolean(),
  attendees: Joi.array().items(Joi.string()),
  units: Joi.objectId(),
  supervisionType: Joi.objectId(),
  approval: Joi.objectId(),
  // id: Joi.string().regex(/^[0-9a-fA-F]{24}$/i),
  creator: Joi.objectId(),
  id: Joi.string(),
});

export default schema;
