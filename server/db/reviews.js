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

// const createFavorite = async (favorite) => {
//     const SQL = `
//         INSERT INTO favorites(id, product_id, user_id)
//         VALUES ($1, $2, $3)
//         RETURNING *
//     `
//     const response = await client.query(SQL, [uuidv4(), favorite.product_id, favorite.user_id])
//     return response.rows[0]
// }

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

module.exports = {
  createReview,
  fetchReviews,
  fetchReview,
};
