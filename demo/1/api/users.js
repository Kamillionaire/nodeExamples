"use strict";
var express = require("express");
var router = express.Router();
router.get('/users', function (req, res, next) {
    res.json({
        message: 'Hello World'
    });
});
module.exports = router;
