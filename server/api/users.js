const express = require("express");
const app = express.Router();
const { updateReview, destroyReview } = require("../db/reviews");
const { isLoggedIn } = require("./middleware");

app.put("/:userId/reviews/:reviewId", isLoggedIn, async (req, res, next) => {
  try {
    res.send(
      await updateReview({
        ...req.body,
        user_id: req.params.userId,
        id: req.params.reviewId,
      })
    );
  } catch (error) {
    next(error);
  }
});

app.delete("/:userId/reviews/:reviewId", isLoggedIn, async (req, res, next) => {
  try {
    await destroyReview({
      user_id: req.params.userId,
      id: req.params.reviewId,
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
