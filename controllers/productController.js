const asyncHandler = require('express-async-handler');
const Product = require('../data/models/productModel.js');



// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
// http://localhost:5000/api/products

const getProducts = asyncHandler(async (req,res) =>{
  const products = await Product.find({});
  res.json(products);
})



// @desc     Fetch single products
// @route    GET /api/products:id
// @access   Public
// http://localhost:5000/api/products/_id
const getProductById = asyncHandler(async (req,res) =>{
    const product = await Product.findById(req?.params?.id);

    if(product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
  });

  module.exports = {
    getProducts,
    getProductById
  };
  