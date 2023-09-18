const user = ['getTickets', 'useTickets',]
const admin = [...user, 'sendTickets', 'buyTickets',]
const supery = [...user, ...admin]


const allRoles = {
  user,
  admin,
  supery,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
