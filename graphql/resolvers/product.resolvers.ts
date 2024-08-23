import { GraphQLError, GraphQLFieldResolver } from "graphql";
import { IProduct, Product } from "../../models/product.model";
import { Category } from "../../models/category.model";
import { FilterQuery, QueryOptions } from "mongoose";

// export const findProduct: GraphQLFieldResolver<
//   any,
//   any,
//   { id: string }
// > = async (_parent, args) => {
//   try {
//     const product = await Product.findById(args.id);
//     if (product) {
//       product.lastViewed = new Date();
//       return await product.save();
//     } else {
//       throw new GraphQLError("Product not found");
//     }
//   } catch {
//     throw new GraphQLError("Product not found");
//   }
// };

export async function findProduct(id: string){
  try {
    const product = await Product.findById(id);
    if (product) {
      product.lastViewed = new Date();
      return await product.save();
    } else {
      throw new GraphQLError("Product not found");
    }
  } catch {
    throw new GraphQLError("Product not found");
  }
};

export const addProduct: GraphQLFieldResolver<
  any,
  any,
  {
    inputs: InstanceType<typeof Product>;
  }
> = async (_parent, args) => {
  // Get category parent id of first categoryId in list and add its parentId at the beginning
  const categoryIds = args.inputs.categoryIds;

  let categoryParentId: string | null = null;
  do {
    const category = await Category.findById(categoryIds[0]);

    if (category) {
      categoryParentId = category.parentId!;
    }
    if (categoryParentId) categoryIds.unshift(categoryParentId);
  } while (categoryParentId);

  const product = new Product({
    ...args.inputs,
    categoryIds,
    lastViewed: new Date(),
  });

  try {
    return await product.save();
  } catch (error) {
    throw new GraphQLError("Input validation failed");
  }
};

// export const findProducts: GraphQLFieldResolver<
//   any,
//   any,
//   {
//     filter?: string;
//     options?: string;
//   }
// > = async (_parent, args) => {
//   let filter = {};
//   if (args.filter) {
//     filter = JSON.parse(args.filter);
//   }

//   let options = {};
//   if (args.options) {
//     options = JSON.parse(args.options);
//   }

//   return Product.find(filter, null, options);
// };

// export const findProductsForCat: GraphQLFieldResolver<
//   InstanceType<typeof Category>,
//   any
// > = (parent, _args) => {
//   if (!parent.id) {
//     return Product.find();
//   }
//   return Product.find({ categoryIds: parent.id });
// };

// findProducts2({filter: {}})

export function findProducts(args: {
  filter?: string;
  options?: string;
}) {
  let filter = {};
  if (args.filter) {
    filter = JSON.parse(args.filter);
  }

  let options = {};
  if (args.options) {
    options = JSON.parse(args.options);
  }

  return Product.find(filter, null, options);
}
