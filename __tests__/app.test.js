const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../api");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200 responds with a topics object with a slug and description", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics.length).toEqual(3);
        topics.forEach((singleTopic) => {
          expect(singleTopic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200 responds with the correct article ", () => {
    return request(app)
      .get("/api/articles/3")
      .expect(200)
      .then(({ body: { article } }) => {
        console.log(article)
        expect(article[0].article_id).toEqual(3);
        expect(article[0]).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });

  //enter a number out of index
  //enter an invalid type e.g string
  describe("GET /api/articles/:article_id error handling", () => {
    test("respond with a 400 bad request when a request is made with a type other than a number", () => {
      return request(app)
        .get("/api/articles/hiii")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe(
            "400 Bad request: make sure you are sending a parameter of type number"
          );
        });
    });

    test("respond with a 404 not found, when an out of index article_id is sent", () => {
      return request(app)
        .get("/api/articles/90000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not found: id 90000 is out of range");
        });
    });
  });
});

describe("GET /api/articles", () => {
  test.only("200 responds with a articles object ", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles.length).toEqual(13);
        articles.forEach((singleArticle) => {
          expect(singleArticle).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });
});
