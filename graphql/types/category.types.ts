import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ProductType } from "./product.types";
import { findByParentId } from "../resolvers/category.resolvers";
import { findProductsForCat } from "../resolvers/product.resolvers";

export const CategoryForNavType: GraphQLObjectType = new GraphQLObjectType({
  name: "CategoryForNav",
  fields: () => ({
    category: {
      type: CategoryType,
      resolve: (parent) => (parent.id ? parent : null),
    },
    subCategories: {
      type: new GraphQLList(CategoryType),
      resolve: findByParentId,
    },
  }),
});

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    parentId: { type: GraphQLID },
    leaf: { type: GraphQLBoolean },
    subCategories: {
      type: new GraphQLList(CategoryType),
      resolve: findByParentId,
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: findProductsForCat,
    },
  }),
});

export const CategoryInputType: GraphQLInputObjectType =
  new GraphQLInputObjectType({
    name: "CategoryInput",
    fields: () => ({
      name: { type: GraphQLString },
      parentId: { type: GraphQLID },
      leaf: { type: GraphQLBoolean },
    }),
  });
