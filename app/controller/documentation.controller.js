const SelectEndPoint = require("../model/model");

const getApi = (req, res) => {
  res.status(200).send({ endpoints: SelectEndPoint() });
};

module.exports = { getApi };
