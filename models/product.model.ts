import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: String,
    description: String,
    manufacturer: String,
    price: Number,
    categoryIds: [String],
    lastViewed: Date
    
  },
  { timestamps: true }
);

export const Product = model("product", productSchema);
