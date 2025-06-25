const client = require("./client");
const { v4 } = require("uuid");
const uuidv4 = v4;

const createProduct = async (product) => {
  const SQL = `
    INSERT INTO products(id, name, category)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    product.name,
    product.category,
  ]);
  return response.rows[0];
};

const fetchProducts = async () => {
  const SQL = `
    SELECT * 
    FROM products
    `;
  const response = await client.query(SQL);
  return response.rows;
};

//NOT SURE IF THIS IS NECESSARY - THEY SHOULD BE ABLE TO SEARCH BY SETTING UP ROUTES ON THE FRONT END
const fetchProduct = async (productId) => {
  const SQL = `
    SELECT *
    FROM products
    WHERE id = $1
    `;
  const response = await client.query(SQL, [productId]);
  return response.rows[0];
};

module.exports = {
  createProduct,
  fetchProducts,
  fetchProduct,
};
