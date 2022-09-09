/** Common config for bookstore. */

const DB_URI_PREFIX = `postgresql:///`;

const DB_URI = connectDB(process.env.NODE_ENV);

function connectDB(env: string | undefined): string {
  const prefix = DB_URI_PREFIX;
  const DB_URI = env === "test" ? prefix + "books_test" : prefix + "books";
  return DB_URI;
}

export { DB_URI };
