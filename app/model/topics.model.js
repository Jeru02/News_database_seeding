const db = require("../../db/connection");

const selectTopics = () => {
  return db.query(`SELECT slug, description FROM TOPICS`);
};

module.exports = { selectTopics };
