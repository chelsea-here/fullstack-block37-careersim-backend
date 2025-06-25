const express = require("express");
const app = express.Router();
const { fetchProducts, fetchProduct } = require("../db/products");
const { fetchReviews } = require("../db/reviews");

app.get("/", async (req, res, next) => {
  try {
    res.send(await fetchProducts());
  } catch (error) {
    next(error);
  }
});

app.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    res.send(await fetchProduct(productId));
  } catch (error) {
    next(error);
  }
});

app.get("/:productId/reviews", async (req, res, next) => {
  try {
    const { productId } = req.params;
    res.send(await fetchReviews(productId));
  } catch (error) {
    next(error);
  }
});

module.exports = app;
