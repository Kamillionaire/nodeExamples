import * as mongoose from 'mongoose';

export interface IProducts extends mongoose.Document {
  name: string,
  price: number
}

let ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

//sets to
ProductSchema.path('price').set(function(num) {
  return (num / 100).toFixed(2);
});

//Sets to 2 decimal on float
ProductSchema.path('price').get(function(num) {
  return (num).toFixed(2);
});

export default mongoose.model<IProducts>("Product", ProductSchema);
