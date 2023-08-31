process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let item = { name: "apple", price: "1.00" };

beforeEach(() => {
  items.push(item);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of shopping list", async function () {
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([item]);
  });
});

describe("POST /items", function () {
  test("Add item to shopping list", async function () {
    const resp = await request(app)
      .post("/items")
      .send({ name: "banana", price: "2.00" });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: { name: "banana", price: "2.00" } });
  });
});

describe("GET /items/:name", function () {
  test("Get a item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual(item);
  });
  test("Test 404", async function () {
    const resp = await request(app).get("/items/orange");
    expect(resp.status).toBe(404);
  });
});

describe("PATCH /items/:name", function () {
  test("Test editing of item", async function () {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({ name: "green apple" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: { name: "green apple", price: "1.00" },
    });
  });
  test("Test 404", async function () {
    const resp = await request(app).patch("/items/orange");
    expect(resp.status).toBe(404);
  });
});

describe("DELETE /items/:name", function () {
  test("Test deleting a item", async function () {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200)
    expect(resp.body).toEqual({message: "Deleted"})
  });
});
