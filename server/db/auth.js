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
