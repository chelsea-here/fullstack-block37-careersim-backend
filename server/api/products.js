const express = require("express");
const app = express.Router();
const { fetchProducts, fetchProduct } = require("../db/products");
const { fetchReviews, fetchReview, createReview } = require("../db/reviews");
const { isLoggedIn } = require("./middleware");

// REQUIRED ROUTES //
// POST /api/products/:productId/reviews 🔒

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

app.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    res.send(await fetchReview(productId, reviewId));
  } catch (error) {
    next(error);
  }
});

app.post("/:productId/reviews", isLoggedIn, async (req, res, next) => {
  try {
    const response = res.send(
      await createReview({ product_id: req.params.productId, ...req.body })
    );
    return response.rows;
  } catch (error) {
    next(error);
  }
});

module.exports = app;
