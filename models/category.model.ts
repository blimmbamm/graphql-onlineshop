import { model, Schema } from "mongoose";



const categorySchema = new Schema({
  name: {type: String, required: true, unique: true},
  // id: String,
  parentId: String,
  leaf: Boolean,
});

export const Category = model("category", categorySchema);

// const c = new Category({name: ""})

// async function save_test(){
//   try {
//     await c.save()
//   } catch(error) {
//     console.log(error)
//   }
// }

// save_test()

console.log(typeof Category)


class Affe{}

console.log(typeof Affe)