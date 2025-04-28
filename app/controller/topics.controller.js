const { selectTopics } = require("../model/topics.model");

const getTopics = (req, res) => {
  selectTopics().then((result) => {
    res.status(200).send({ topics: result.rows });
  });
};

module.exports = { getTopics };
