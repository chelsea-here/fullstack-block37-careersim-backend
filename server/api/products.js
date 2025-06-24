const express = require("express");
const app = express.Router();
const { fetchProducts } = require("../db/products");

// REQUIRED ROUTES //
// GET /api/items

// GET /api/items/:itemId

// GET /api/items/:itemId/reviews

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (error) {
    next(error);
  }
});

// app.get("/:productId", async (req, res, next) => {
//   try {
//     res.send(await fetchProducts());
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = app;
