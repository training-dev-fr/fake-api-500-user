const express = require("express");
const router = express.Router();
const productController = require("./../controller/product.controller");


router.post('/:page', productController.getList);

router.get('/:id', productController.getById);

module.exports = router;