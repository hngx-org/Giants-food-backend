const express = require("express")
const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const { authService, userService } = require('../services');



const getUsersByOrgID = async (req, res, next) => {
  try {
    const org_id = req.params.org_id;

  const users = await userService.getPersonsByOrgID({ id: org_id });

  if (!users) {
    return res.status(404).json({
      message: "No User Found From The Organization",
    });
  }

  res.status(200).json({
    message: "Here are the Users from the organization",
    data: users,
  })
  } catch (error) {
    next(error);
  };
};

module.exports = {
  getUsersByOrgID,
}