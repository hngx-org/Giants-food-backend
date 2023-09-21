const express = require("express")
const httpStatus = require('http-status');
const Asyncly = require('../utils/Asyncly');
const {userService } = require('../services');



const getUsersByOrgID = Asyncly(async (req, res) => {

    const org_id = req.params.org_id;

  const users = await userService.getUsersByOrgID(org_id );

  if (users.length === 0) {
    return res.status(404).json({
      message: "No User Found From The Organization",
    });
  }

  return res.status(200).json({
    message: "Here are the Users from the organization",
    data: users,
  })
  
});


const getUserById = Asyncly(async (req, res) => {
    const { id } = req.params
    const user = await userService.getPersonById({ id })
    return res.status(httpStatus.OK).json({ user })
})

const getUserByEmail = Asyncly(async (req, res) => {
    const { email } = req.params
    const user = await userService.getPersonByEmail({ email })
    return res.status(httpStatus.OK).json({ user })
})

module.exports = { getUserById, getUserByEmail, getUsersByOrgID, };
