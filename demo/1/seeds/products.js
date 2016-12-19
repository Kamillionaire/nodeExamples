"use strict";
var products_1 = require("../models/products");
products_1.default.find().count(function (err, c) {
    if (c <= 0) {
        for (var i = 0; i < 100; i++) {
            var p = new products_1.default();
            p.name = Math.random().toString(36).substring(7);
            p.price = Math.random() + 1000;
            p.save();
        }
    }
});
