const { selectTopics } = require("../model/topics.model");

const getTopics = (req, res) => {
  res.status(200);

  selectTopics().then((result) => {
    res.send({ topics: result.rows });
  });
};

module.exports = { getTopics };
