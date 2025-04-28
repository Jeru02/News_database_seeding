const endpointsJson = require("../endpoints.json");
const request = require('supertest')
const app = require('../api')
const db = require("../db/connection")
const seed = require('../db/seeds/seed')
const data = require("../db/data/test-data/index")
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
    .then(({body:{topics}}) => {

      expect(topics).toEqual([{slug: "mitch", description:"The man, the Mitch, the legend" }, {slug:"cats", description: "Not dogs"}, {slug:"paper", description: "what books are made of"}])

    }) 




  });
});