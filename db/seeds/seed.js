const db = require("../connection");
var format = require("pg-format");
const { convertTimestampToDate, findArticleId } = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return db
    .query(
      `

    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS articles;
    DROP TABLE IF EXISTS topics;
    DROP TABLE IF EXISTS users;
   
    `
      //drop any tables
    )
    .then(() => {
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
    title VARCHAR(100),
    topic VARCHAR(40) REFERENCES topics(slug),
    author VARCHAR(40) REFERENCES users(username),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000) 
    );

    CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id),
    body TEXT,
    votes INT DEFAULT 0,
    author VARCHAR(40) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`
      );
    })
    .then(() => {
      //formats topic data to inject
      const formattedTopicData = topicData.map((rowToinsert) => {
        return [rowToinsert.slug, rowToinsert.description, rowToinsert.img_url];
      });

      //creates insert topic query
      const insertTopicQuery = format(
        `INSERT INTO topics 
      (slug, description, img_url)
      VALUES %L;`,
        formattedTopicData
      );

      return db.query(insertTopicQuery);
    })
    .then(() => {
      //inserting user data
      const formattedUserData = userData.map((rowToinsert) => {
        return [rowToinsert.username, rowToinsert.name, rowToinsert.avatar_url];
      });

      //USING PG FORMAT TO FORMAT THE DATA
      const insertUserDataQuery = format(
        `INSERT INTO users 
      (username, name, avatar_url)
      VALUES %L;`,
        formattedUserData
      );
      return db.query(insertUserDataQuery);
    })
    .then(() => {
      //inserting  article data
      const formattedArticleData = articleData.map((rowToinsert) => {
        const newRowToinsert = convertTimestampToDate(rowToinsert);

        return [
          newRowToinsert.title,
          newRowToinsert.topic,
          newRowToinsert.author,
          newRowToinsert.body,
          newRowToinsert.created_at,
          newRowToinsert.votes,
          newRowToinsert.article_img_url,
        ];
      });

      //USING PG FORMAT TO FORMAT THE DATA
      const insertArticleDataQuery = format(
        `INSERT INTO articles 
      (title, topic, author, body, created_at, votes, article_img_url)
      VALUES %L RETURNING *;`,
        formattedArticleData
      );

      return db.query(insertArticleDataQuery);
    })
    .then((RESULT) => {
      const articles = RESULT.rows.map((row) => {
        let title = row.title;
        let id = row.article_id;
        return { [title]: id };
      });

      return articles;

      //insert comment data
      // article_id field that references an article's primary key
      // created_at - NEEDS TO BE FORMATTED

      //articles has articl id and
    })
    .then((articles_title_id) => {
      const formattedCommentData = commentData.map((rowToinsert) => {
        const newRowToinsert = convertTimestampToDate(rowToinsert);

        return [
          findArticleId(articles_title_id, rowToinsert.article_title),
          newRowToinsert.body,
          newRowToinsert.votes,
          newRowToinsert.author,
          newRowToinsert.created_at,
        ];
      });

      const insertCommentDataQuery = format(
        `INSERT INTO comments 
      (article_id, body, votes, author, created_at)
      VALUES %L;`,
        formattedCommentData
      );

      return db.query(insertCommentDataQuery);
    });
  //<< write your first query in here. // db.query is a promise with some parameters
  //must return a query so we can close the db connection
  //in the run seed file
};
module.exports = seed;
