const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../api");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index");
require("jest-sorted");
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
        console.log(article);
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
  test("200 responds with a articles object in decending order by date ", () => {
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
            comment_count: expect.any(String),
          });
        });
        console.log(articles);
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });

  describe("GET /api/articles/:article_id/comments", () => {
    test("200: responds with all the comments for a particular article", () => {
      return request(app)
        .get("/api/articles/3/comments")
        .expect(200)
        .then(({ body: { comments } }) => {
          expect(comments.length).toBe(2);
          comments.forEach((singleComment) => {
            expect(singleComment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            });
          });
        });
    });

    describe("GET /api/articles/:article_id/comments error handling", () => {
      test("respond with a 400 bad request when a request is made with a type other than a number", () => {
        return request(app)
          .get("/api/articles/hello/comments")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "400 Bad request: make sure you are sending a parameter of type number"
            );
          });
      });
      test("respond with a 404 notfound when a request is made with a type other than a number", () => {
        return request(app)
          .get("/api/articles/900000/comments")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "404 Not found: no article was found with id: 900000"
            );
          });
      });
    });
  });
});

describe("Post /api/articles/:article_id/comments", () => {
  test("201: responds with the newly posted comment", () => {
    //arrange
    const newComment = {
      username: "icellusedkars",
      body: "congrats on the new job Tom!",
    };
    //act
    return (
      request(app)
        .post("/api/articles/3/comments")
        .send(newComment)
        //assert
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment.author).toBe("icellusedkars");
          expect(comment.body).toBe("congrats on the new job Tom!");
        })
    );
  });

  describe("POST /api/articles/:article_id/comments error handling", () => {
    test("400: when a request is made with a type other than a number", () => {
      const newComment = {
        username: "icellusedkars",
        body: "congrats on the new job Tom!",
      };
      return (
        request(app)
          .post("/api/articles/yoo/comments")
          .send(newComment)
          //assert
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "400 Bad request: make sure you are sending a parameter of type number"
            );
          })
      );
    });

    test("400: when a request with no body", () => {
      const newComment = {
        username: "icellusedkars",
        body: "",
      };
      return (
        request(app)
          .post("/api/articles/3/comments")
          .send(newComment)
          //assert
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "400 Bad request: no body provided"
            );
          })
      );
    });

    test("404: when a request is made with an out of bound id", () => {
      const newComment = {
        username: "icellusedkars",
        body: "congrats on the new job Tom!",
      };
      return (
        request(app)
          .post("/api/articles/90000/comments")
          .send(newComment)
          //assert
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "404 not found: no article was found with id: 90000, post attempt failed"
            );
          })
      );
    });

    test("404: when a request is made with a user that does not exist", () => {
      const newComment = {
        username: "Jeru",
        body: "congrats on the new job Tom!",
      };
      return (
        request(app)
          .post("/api/articles/3/comments")
          .send(newComment)
          //assert
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "404 not found: no user was found with username: Jeru, post attempt failed"
            );
          })
      );
    });
  });
});
