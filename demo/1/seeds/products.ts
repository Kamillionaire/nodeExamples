import Product from '../models/products';
Product.find().count((err, c:number) => {
  if(c <= 0) {
    for(let i = 0; i < 100; i++) {
      let p = new Product();
      p.name = Math.random().toString(36).substring(7);
      p.price = Math.random() + 1000;
      p.save();
    }
  }
});
