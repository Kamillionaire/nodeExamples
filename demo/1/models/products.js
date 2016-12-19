"use strict";
var mongoose = require("mongoose");
var ProductSchema = new mongoose.Schema({
    name: String,
    price: Number
});
ProductSchema.path('price').set(function (num) {
    return (num / 100).toFixed(2);
});
ProductSchema.path('price').get(function (num) {
    return (num).toFixed(2);
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mongoose.model("Product", ProductSchema);
