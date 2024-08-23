import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { ProductInputType, ProductType } from "./types/product.types";
import {
  addProduct,
  findProduct,
  findProducts,
} from "./resolvers/product.resolvers";
import {
  CategoryForNavType,
  CategoryInputType,
  CategoryType,
} from "./types/category.types";
import {
  addCategory,
  findCategory,
  findCategoryForNav,
  patchCategory,
} from "./resolvers/category.resolvers";

const RootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    category: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => findCategory(args.id),
    },
    categoryForNav: {
      type: CategoryForNavType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => findCategoryForNav(args.id),
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: (_parent, args) => findProduct(args.id),
    },
    products: {
      type: new GraphQLList(ProductType),
      args: {
        filter: { type: GraphQLString },
        options: { type: GraphQLString },
      },
      resolve: (_parent, args) => findProducts(args),
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCategory: {
      type: CategoryType,
      args: { inputs: { type: CategoryInputType } },
      resolve: addCategory,
    },
    patchCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID }, inputs: { type: CategoryInputType } },
      resolve: patchCategory,
    },
    addProduct: {
      type: ProductType,
      args: { inputs: { type: ProductInputType } },
      resolve: addProduct,
    },
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
