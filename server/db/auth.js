const client = require("./client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticate = async (credentials) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
    `;
  const response = await client.query(SQL, [credentials.username]);
  if (!response.rows.length) {
    const error = Error("incorrect username");
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(
    credentials.password,
    response.rows[0].password
  );
  if (!valid) {
    const error = Error("incorrect password");
    error.status = 401;
    throw error;
  }
  const token = await jwt.sign({ id: response.rows[0].id }, process.env.JWT);
  return { token };
};

const findUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
    SELECT id, username
    FROM users
    WHERE $1 = id;
    `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
      const error = "bad credentials";
      error.status = 401;
      throw error;
    }
    return response.rows[0];
  } catch (error) {
    console.log(error);
    const er = "bad token";
    er.status = 401;
    throw error;
  }
};

module.exports = { authenticate, findUserByToken };
