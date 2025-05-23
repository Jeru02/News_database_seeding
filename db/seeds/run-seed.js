const devData = require('../data/development-data/index.js');
//object conating all data articles, comments, topics and user
const seed = require('./seed.js');
//seed makes all out quires
const db = require('../connection.js');
//and allows us to close the databae connection in the promise


const runSeed = () => {
  //seed(devData) returns a db query which is a promise
  return seed(devData).then(() => db.end());
  
};

runSeed();
