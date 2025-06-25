const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const createReview = async (review) => {
  const SQL = `
    INSERT INTO reviews(id, product_id, user_id, comment, rating)
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

const fetchReviews = async (productId) => {
  const SQL = `
  SELECT * 
  FROM reviews 
  WHERE product_id = $1
  `;
  const response = await client.query(SQL, [productId]);
  return response.rows;
};

module.exports = {
  createReview,
  fetchReviews,
};
