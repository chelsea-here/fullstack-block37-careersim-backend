const express = require("express");
const app = express.Router();
const { authenticate } = require("../db/auth");

// REQUIRED ROUTES //
// - POST /api/auth/register
// - POST /api/auth/login
// - GET /api/auth/me 🔒

// app.post("/login", async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// });

app.post("/login", async (req, res, next) => {
  try {
    const token = await authenticate(req.body);
    res.send(token);
  } catch (error) {
    next(error);
  }
});
