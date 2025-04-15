const db = require("../connection")
var format = require('pg-format');

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

    //formats data to inject
    const formattedTopicData = topicData.map((rowToinsert)=>{
      return [rowToinsert.description, rowToinsert.slug, rowToinsert.img_url]
    })


    //creates insert query
    const insertTopicQuery = format(
      `INSERT INTO topics 
      (slug, description, img_url)
      VALUES %L;`, formattedTopicData)

      

    return db.query(insertTopicQuery)

  

  }).then(()=>{

    //inserting user data
    const formattedUserData = userData.map((rowToinsert)=>{
      return [rowToinsert.username, rowToinsert.name, rowToinsert.avatar_url]
    })

    //USING PG FORMAT TO FORMAT THE DATA
    const insertUserDataQuery = format(
      `INSERT INTO users 
      (username, name, avatar_url)
      VALUES %L;`, formattedUserData)
    return db.query(insertUserDataQuery)




  }).then(()=>{

      console.log(articleData)


    //inserting  article data
    const formattedArticleData = articleData.map((rowToinsert)=>{
      return [rowToinsert.title, rowToinsert.topic, rowToinsert.author, rowToinsert.body, rowToinsert.created_at, rowToinsert.votes, rowToinsert.article_img_url]
    })

    //USING PG FORMAT TO FORMAT THE DATA
    const insertArticleDataQuery = format(
      `INSERT INTO articles 
      (title, topic, author, body, created_at, votes, article_img_url)
      VALUES %L;`, formattedArticleData)
      
  
    return db.query(``)

    



  });
   //<< write your first query in here. // db.query is a promise with some parameters
   //must return a query so we can close the db connection 
   //in the run seed file
};
module.exports = seed;
