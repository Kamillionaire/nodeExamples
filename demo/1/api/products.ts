import * as express from 'express';
import Product from '../models/products';
let router = express.Router();
import * as mongoose from 'mongoose';

router.post('/products', (req, res, next) => {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.save().then((p) => {
    res.json(p);
  }).catch((e) => {
    res.status(500).json({message: e});
  })
});

export = router;
