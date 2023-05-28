const express = require("express");
const asyncHandler = require('express-async-handler');
const router = express.Router();
const Product = require('../data/models/productModel.js');

// @desc     Fetch all products
// @route    GET /api/products
// @access   Public
// http://localhost:5000/api/products
router.get('/', asyncHandler(async (req,res) =>{
    const products = await Product.find({})
    res.json(products)
}))


// @desc     Fetch single products
// @route    GET /api/products:id
// @access   Public
// http://localhost:5000/api/products/_id

router.get('/:id', asyncHandler(async (req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product);
       }
       else{
        res.status(404);
        throw new Error('Product Not Found');
       }
}))
  
module.exports = router
