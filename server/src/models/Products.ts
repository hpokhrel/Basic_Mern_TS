import mongoose, { Schema, Document } from "mongoose";

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<Product>("Product", ProductSchema);
