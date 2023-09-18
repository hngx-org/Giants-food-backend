const Joi = require("joi");
const { password, objectId, dateOfBirth } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid("user", "admin"),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const createAccount = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    dob: Joi.string().required().custom(dateOfBirth),
    acct_type: Joi.string().required().valid("savings", "checking", "current"),
    initial_balance: Joi.number().positive().required(),
  }),
};

const viewSingleAccount = {
  body: Joi.object().keys({
    acc_number: Joi.string().required().min(10).max(10),
  }),
};

const viewAllAccount = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createAccount,
  viewSingleAccount,
  viewAllAccount,
};
