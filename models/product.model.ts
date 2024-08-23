import { Document, model, Schema } from "mongoose";

// interface Product extends Document {
//   name: { type: String, required: true },
//   description: String,
//   manufacturer: { type: String, required: true },
//   price: { type: Number, required: true },
//   categoryIds: [String],
//   lastViewed: Date,
// }

export interface IProduct extends Document {
  name: string;
  description: string;
  manufacturer: string;
  price: number;
  categoryIds: string[];
  lastViewed: Date;
}

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

const productSchema2 = new Schema<IProduct>(
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

export const Product = model("product", productSchema2);
// export const Product = model("product", productSchema);
