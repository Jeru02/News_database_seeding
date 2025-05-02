const { selectUsers } = require("../model/users.model");

const getUsers = (req, res, next) => {
  return selectUsers().then((result) => {
    res.status(200).send({ users: result.rows });
  });
};

module.exports = { getUsers };
