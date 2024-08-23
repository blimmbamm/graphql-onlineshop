import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {type: String, required: true, unique: true},
  parentId: String,
  leaf: Boolean,
});

export const Category = model("category", categorySchema);

