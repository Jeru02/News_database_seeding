const {
  convertTimestampToDate,
  findArticleId
} = require("../db/seeds/utils");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});


//behaviour of function 

//expected input
// >>> []
// >>> Hi

//expected output
// >>> return undefined
// >>> return undefined



describe("findArticleId", ()=>{

test("when a title that doesnt exist is passed, return undefined", ()=>{

  const input = "yo yo books"
  const inputArray = [{harry_potter: 1}]

  const output = findArticleId(inputArray, input)

  expect(output).toBe(undefined)

})


test("when passed a book that exists return the books id ", ()=>{

  const inputArray = [{"harry potter": 1}]
  const input = "harry potter"

  const output = findArticleId(inputArray, input)

  expect(output).toEqual(1)

})

test("when passed a book that exists in an array containing more than 1 book return its id ", ()=>{

  const inputArray = [{"harry potter": 1}, {"harry potter 2": 5}, {"harry potter 3": 8}]
  const input = "harry potter 3"

  const output = findArticleId(inputArray, input)

  expect(output).toEqual(8)

})






})

