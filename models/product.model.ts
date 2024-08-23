import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true },
    categoryIds: [String],
    lastViewed: Date,
  },
  { timestamps: true }
);

export const Product = model("product", productSchema);
