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

const fetchReview = async (productId, reviewId) => {
  const SQL = `
  SELECT * 
  FROM reviews
  WHERE product_id = $1 and id = $2
  `;
  const response = await client.query(SQL, [productId, reviewId]);
  return response.rows[0];
};

const fetchUserReviews = async (user) => {
  const SQL = `
  SELECT * 
  FROM reviews
  WHERE user_id = $1`;
  const response = await client.query(SQL, [user.id]);
  return response.rows;
};

const updateReview = async (review) => {
  const SQL = `
    UPDATE reviews
    SET rating = $1, comment = $2
    WHERE id = $3 AND user_id = $4
    RETURNING *;
  `;
  const response = await client.query(SQL, [
    review.rating,
    review.comment,
    review.id,
    review.user_id,
  ]);
  return response.rows[0];
};

const destroyReview = async (review) => {
  const SQL = `
    DELETE FROM reviews
    WHERE id = $1 and user_id = $2
    `;
  await client.query(SQL, [review.id, review.user_id]);
};

module.exports = {
  createReview,
  fetchReviews,
  fetchReview,
  fetchUserReviews,
  updateReview,
  destroyReview,
};
