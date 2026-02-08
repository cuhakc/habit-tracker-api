const Joi = require("joi");

const weeklyStatusSchema = Joi.object({
  mon: Joi.boolean(),
  tue: Joi.boolean(),
  wed: Joi.boolean(),
  thu: Joi.boolean(),
  fri: Joi.boolean(),
  sat: Joi.boolean(),
  sun: Joi.boolean()
}).unknown(false);

const createHabitSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow("").max(500),
  weeklyStatus: weeklyStatusSchema
});

const updateHabitSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  description: Joi.string().allow("").max(500),
  weeklyStatus: weeklyStatusSchema
}).min(1);

module.exports = { createHabitSchema, updateHabitSchema };