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

  afterAll(async () => {
    await db.end();
  });

  test("can get list of books", async () => {
    const res = await request(app).get("/books");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      books: [testBook],
    });
  });

  test("can get one book", async () => {
    const res = await request(app).get("/books/978-etc");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: testBook });
  });

  test("can add a book", async () => {
    const newBook = { ...testBook };
    newBook.isbn = "978-alt";
    const res = await request(app).post("/books").send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ book: newBook });
  });

  test("can edit a book", async () => {
    const bookEdits = { ...testBook };
    bookEdits.amazon_url = "https://amazon.com/new_url";
    const res = await request(app).put("/books/978-etc").send(bookEdits);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ book: bookEdits });
  });

  test("can delete a book", async () => {
    const res = await request(app).delete("/books/978-etc");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Book deleted" });
  });

  /* validations */

  test("validations prevent book from being added with incorrect JSON", async () => {
    const res = await request(app)
      .post("/books")
      .send({ book: "invalid json" });
    expect(res.statusCode).toBe(400);
  });

  test("validations prevent book from being added with incorrect JSON", async () => {
    const res = await request(app)
      .put("/books/978-etc")
      .send({ book: "invalid json" });
    expect(res.statusCode).toBe(400);
  });
});
