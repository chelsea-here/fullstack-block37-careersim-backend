const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const createReview = async (review) => {
  const SQL = `
    INSERT INTO products(id, product_id, user_id, comment, rating)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    review.product_id,
    review.user_id,
    review.comment,
    review.rating,
  ]);
  return response.rows[0];
};

module.exports = {
  createReview,
};
