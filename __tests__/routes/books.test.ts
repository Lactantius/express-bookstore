import request from "supertest";

import app from "../../src/app";
import db from "../../src/db";
import Book from "../../src/models/book";

describe("Book routes test", () => {
  const testBook = {
    isbn: "978-etc",
    amazon_url: "https://amazon.com/test_book",
    author: "Lector Scriptor",
    language: "English",
    pages: 500,
    publisher: "Penguin",
    title: "Test Book",
    year: 2015,
  };

  beforeEach(async () => {
    await db.query("DELETE FROM books");

    const book1 = await Book.create(testBook);
  });

  afterEach(async () => {
    await db.end();
  });

  test("can get list of books", async () => {
    const res = await request(app).get("/books");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      books: [testBook],
    });
  });
});

// describe("GET /books", () => {
//   test("can get list of books", async () => {
//     const response = await request(app).get("/books");

//     expect(response.statusCode).toBe(200);
//   });
// });
