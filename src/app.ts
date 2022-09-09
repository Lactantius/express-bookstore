/** Express app for bookstore. */


import express, { NextFunction } from "express";
const app = express();

app.use(express.json());

import ExpressError from "./expressError";
import bookRoutes from "./routes/books";

app.use("/books", bookRoutes);

/** 404 handler */

app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});


/** general error handler */

app.use(function (err: ExpressError, req: any, res: any, next: NextFunction) {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});


export default app;
