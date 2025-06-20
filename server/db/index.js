const client = require("./client");
const uuid = require("uuid");

const seed = async () => {
  const SQL = `
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products(
      id UUID PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      category VARCHAR(20) NOT NULL
    );
    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) NOT NULL,
      user_id UUID REFERENCES users(id) NOT NULL,
      CONSTRAINT product_and_user_id UNIQUE(product_id, user_id),
      review VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL
      CONSTRAINT rating_btwn_1_and_5 CHECK(rating BETWEEN 1 AND 5)
    );
    `;
  await client.query(SQL);
  console.log("tables created");
};

module.exports = {
  client,
  seed,
};
