import {
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { CategoryType } from "./category.types";
import { findCategories } from "../resolvers/category.resolvers";

export const ProductType: GraphQLObjectType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    price: { type: GraphQLFloat },
    priceFormatted: {
      type: GraphQLString,
      resolve: (parent: any) => `${parent.price.toFixed(2)}€`,
    },
    createdAt: { type: GraphQLString },
    categoryIds: { type: new GraphQLList(GraphQLString) },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: (parent) =>
        findCategories({
          filter: JSON.stringify({
            _id: { $in: parent.categoryIds },
          }),
        }),
    },
  }),
});

export const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: {
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    manufacturer: { type: GraphQLString },
    price: { type: GraphQLFloat },
    categoryIds: { type: new GraphQLList(GraphQLString) },
  },
});
