"use strict";
var express = require("express");
var products_1 = require("../models/products");
var router = express.Router();
router.post('/products', function (req, res, next) {
    var product = new products_1.default();
    product.name = req.body.name;
    product.price = req.body.price;
    product.save().then(function (p) {
        res.json(p);
    }).catch(function (e) {
        res.status(500).json({ message: e });
    });
});
module.exports = router;
