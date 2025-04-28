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
        topics.forEach((singleTopic)=>{

          expect(singleTopic).toMatchObject({slug: expect.any(String),
            description: expect.any(String),})

        })
      });
  });
});
// [
//           { slug: "mitch", description: "The man, the Mitch, the legend" },
//           { slug: "cats", description: "Not dogs" },
//           { slug: "paper", description: "what books are made of" },
//         ]

xdescribe("GET /api/articles/:article_id", () => {

  test("200 responds with the correct article ",()=>{

    return request(app)
      .get("/api/articles/:3")
      .expect(200)
      .then(({body: {article}})=>{
        expect(article[0]).toEqual([{article_id: 3, title:"Eight pug gifs that remind me of mitch", topic:"mitch", author:"icellusedkars", body:"some gifs", created_at: 1604394720000, votes: 0,article_img_url:"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"}])
      })


  })
  
});

// {
//   title: "Eight pug gifs that remind me of mitch",
//   topic: "mitch",
//   author: "icellusedkars",
//   body: "some gifs",
//   created_at: 1604394720000,
//   votes: 0,
//   article_img_url:
//     "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
// }