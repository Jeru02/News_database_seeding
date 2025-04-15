const db = require("../connection")

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`

    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS articles;
    DROP TABLE IF EXISTS topics;
    DROP TABLE IF EXISTS users;
   
    `
    //drop any tables
  ).then(()=>{
    return db.query(
      //create tables
      `CREATE TABLE topics (
    slug VARCHAR(40) PRIMARY KEY,
    description VARCHAR(250),
    img_url VARCHAR(1000)
    );

    CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY,
    name VARCHAR(40),
    avatar_url VARCHAR(1000)
    );

    CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(40),
    topic VARCHAR(40),
    author VARCHAR(40),
    body TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000),
    FOREIGN KEY (topic) REFERENCES topics(slug),
    FOREIGN KEY (author) REFERENCES users(username)  
    );

    CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT,
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR(40),
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(article_id),
    FOREIGN KEY (author) REFERENCES users(username)    
    );`)
  }).then(()=>{

    






  }); //<< write your first query in here. // db.query is a promise with some parameters
};
module.exports = seed;
