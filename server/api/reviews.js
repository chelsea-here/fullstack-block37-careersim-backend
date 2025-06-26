const express = require("express");
const app = express.Router();
const { isLoggedIn } = require("./middleware");
const { fetchUserReviews } = require("../db/reviews");

app.get("/me", isLoggedIn, async (req, res, next) => {
  try {
    const response = res.send(await fetchUserReviews(req.user));
    return response.rows;
  } catch (error) {
    next(error);
  }
});

module.exports = app;
