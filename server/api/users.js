const express = require("express");
const app = express.Router();

// REQUIRED ROUTES //
// PUT /api/users/:userId/reviews/:reviewId 🔒

// DELETE /api/users/:userId/reviews/:reviewId 🔒

app.get("/", async (req, res, next) => {
  try {
    res.send("inside of GET /api/users route!");
  } catch (error) {
    next(error);
  }
});

module.exports = app;
