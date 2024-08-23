import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { ProductType } from "./product.types";
import { findCategories } from "../resolvers/category.resolvers";
import { findProducts } from "../resolvers/product.resolvers";

export const CategoryForNavType: GraphQLObjectType = new GraphQLObjectType({
  name: "CategoryForNav",
  fields: () => ({
    category: {
      type: CategoryType,
      resolve: (parent) => (parent.id ? parent : null),
    },
    subCategories: {
      type: new GraphQLList(CategoryType),
      resolve: (parent) =>
        findCategories({ filter: JSON.stringify({ parentId: parent.id }) }),
    },
  }),
});

export const CategoryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    parentId: { type: GraphQLID },
    affe: { type: GraphQLBoolean },
    leaf: { type: GraphQLBoolean },
    subCategories: {
      type: new GraphQLList(CategoryType),
      resolve: (parent) =>
        findCategories({ filter: JSON.stringify({ parentId: parent.id }) }),
    },
    products: {
      type: new GraphQLList(ProductType),
      resolve: (parent) => {
        const filter = parent.id
          ? JSON.stringify({ categoryIds: parent.id })
          : undefined;

        return findProducts({ filter });
      },
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
