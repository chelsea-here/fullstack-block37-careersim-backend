const client = require("./client");
const uuid = require("uuid");
const { createUser } = require("./users");
const { createProduct } = require("./products");
const { createReview } = require("./reviews");

const seed = async () => {
  //CREATE TABLES
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
      comment VARCHAR(255) NOT NULL,
      rating INTEGER NOT NULL,
      CONSTRAINT rating_btwn_1_and_5 CHECK(rating BETWEEN 1 AND 5)
    );
    `;
  await client.query(SQL);
  console.log("tables created");
  //TODO: SEED TABLES
  const [chelsea, evan, david, gizmo, grimlock, frankie] = await Promise.all([
    createUser({ username: "chelsea", password: "chelseapswd" }),
    createUser({ username: "evan", password: "evanpswd" }),
    createUser({ username: "david", password: "davidpswd" }),
    createUser({ username: "gizmo", password: "gizmopswd" }),
    createUser({ username: "grimlock", password: "grimlockpswd" }),
    createUser({ username: "frankie", password: "frankiepswd" }),
  ]);

  console.log("users created");

  const [
    unfinished_wood_chair,
    painted_wood_chair,
    annodized_metal_chair,
    powder_coated_metal_chair,
    unfinished_wood_table,
    painted_wood_table,
    annodized_metal_table,
    powder_coated_metal_table,
    clear_glass_vase,
    clear_tulip_glass_vase,
    orange_ceramic_vase,
    blue_ceramic_vase,
  ] = await Promise.all([
    createProduct({ name: "Unfinished Wood Chair", category: "Chairs" }),
    createProduct({ name: "Painted Wood Chair", category: "Chairs" }),
    createProduct({ name: "Annodized Metal Chair", category: "Chairs" }),
    createProduct({ name: "Powder Coated Metal Chair", category: "Chairs" }),
    createProduct({ name: "Unfinished Wood Table", category: "Tables" }),
    createProduct({ name: "Painted Wood Table", category: "Tables" }),
    createProduct({ name: "Annodized Metal Table", category: "Tables" }),
    createProduct({ name: "Powder Coated Metal Table", category: "Tables" }),
    createProduct({ name: "Clear Glass Vase", category: "Flower Vases" }),
    createProduct({ name: "Clear Tulip Glass Vase", category: "Flower Vases" }),
    createProduct({ name: "Orange Ceramic Vase", category: "Flower Vases" }),
    createProduct({ name: "Blue Ceramic Vase", category: "Flower Vases" }),
  ]);
  console.log("products created");

  await Promise.all([
    createReview({
      product_id: painted_wood_chair.id,
      user_id: chelsea.id,
      comment: "The paint was chipping on this chair.",
      rating: 1,
    }),
    createReview({
      product_id: annodized_metal_chair.id,
      user_id: david.id,
      comment: "Loved the shiny finish on this chair.",
      rating: 5,
    }),
    createReview({
      product_id: annodized_metal_chair.id,
      user_id: grimlock.id,
      comment: "This makes an acceptable cat throne.",
      rating: 3,
    }),
    createReview({
      product_id: annodized_metal_table.id,
      user_id: evan.id,
      comment:
        "My mom likes how easy this table is to clean... and I like to make messes!",
      rating: 4,
    }),
    createReview({
      product_id: annodized_metal_table.id,
      user_id: chelsea.id,
      comment: "We got a second one because it works for my crazy toddler.",
      rating: 5,
    }),
    createReview({
      product_id: annodized_metal_chair.id,
      user_id: frankie.id,
      comment:
        "When I look at this chair I see another cat staring back at me.  He must be stuck in the matrix.",
      rating: 2,
    }),
    createReview({
      product_id: unfinished_wood_table.id,
      user_id: grimlock.id,
      comment: "I love sleeping on this table.",
      rating: 5,
    }),
    createReview({
      product_id: unfinished_wood_table.id,
      user_id: david.id,
      comment: "Good table.",
      rating: 4,
    }),
    createReview({
      product_id: unfinished_wood_table.id,
      user_id: evan.id,
      comment: "Good table, but I need one that's kid size.",
      rating: 3,
    }),
    createReview({
      product_id: clear_glass_vase.id,
      user_id: evan.id,
      comment: "I broke this almost immediately.  Should be stronger.",
      rating: 3,
    }),
    createReview({
      product_id: clear_glass_vase.id,
      user_id: chelsea.id,
      comment:
        "Beautiful, until my toddler saw it.  Then immediately threw it.",
      rating: 3,
    }),
    createReview({
      product_id: clear_tulip_glass_vase.id,
      user_id: chelsea.id,
      comment: "Beautiful, just keep it where toddlers can't reach.",
      rating: 3,
    }),
    createReview({
      product_id: clear_tulip_glass_vase.id,
      user_id: david.id,
      comment: "Bought for my wife. She is pleased.",
      rating: 4,
    }),
    createReview({
      product_id: clear_tulip_glass_vase.id,
      user_id: frankie.id,
      comment: "I like to eat the flowers.",
      rating: 5,
    }),
    createReview({
      product_id: clear_tulip_glass_vase.id,
      user_id: evan.id,
      comment: "So pretty, I can't wait to break it.",
      rating: 2,
    }),
  ]);
};

module.exports = {
  client,
  seed,
};
