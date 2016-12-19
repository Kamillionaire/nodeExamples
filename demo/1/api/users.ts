import * as express from 'express';
let router = express.Router();

router.get('/users', (req, res, next) => {
  res.json({
    message: 'Hello World'
  });
});

export = router;
