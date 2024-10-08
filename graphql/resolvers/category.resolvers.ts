import { GraphQLError, GraphQLFieldResolver } from "graphql";
import { Category } from "../../models/category.model";

const RootCategory = () => new Category({ _id: null });

export async function findCategoryForNav(id: string | null) {
  // 1. If id = null, return dummy (null) category
  // 2. Id category not found, return dummy (null) category
  // 3. If category is leaf:
  //  3.1. If parentId is null: return dummy
  //  3.2. Else: fetch parent category

  if (!id) {
    return RootCategory();
  }

  let category;
  try {
    category = await Category.findById(id);
  } catch {
    throw new GraphQLError("Category not found");
  }

  let categoryParentId: string | null | undefined;

  if (!category) {
    return RootCategory();
  } else {
    categoryParentId = category.parentId;
  }

  if (category.leaf) {
    if (!categoryParentId) {
      return RootCategory();
    } else {
      category = await Category.findById(categoryParentId);
    }
  }

  return category;
}

export async function findCategory(id: string | null) {
  if (!id) {
    return RootCategory();
  }

  try {
    return await Category.findById(id);
  } catch {
    throw new GraphQLError("Category not found");
  }
}

export async function findCategories(args: {
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

  return Category.find(filter, null, options);
}



export const addCategory: GraphQLFieldResolver<
  any,
  any,
  { inputs: InstanceType<typeof Category> }
> = async (_parent, args) => {
  const category = new Category(args.inputs);

  try {
    await category.save();
  } catch (error) {
    throw new GraphQLError("Input validation failed");
  }

  if (args.inputs.parentId) {
    const parentCategory = await Category.findById(args.inputs.parentId);
    if (parentCategory && parentCategory.leaf) {
      parentCategory.leaf = false;
      await parentCategory.save();
    }
  }
};

export const patchCategory: GraphQLFieldResolver<
  any,
  any,
  { id: string; inputs: InstanceType<typeof Category> }
> = async (_parent, args) => {
  const category = await Category.findById(args.id);
  if (category) {
    try {
      category.name = args.inputs.name;
      await category.save();
    } catch (error) {
      throw new GraphQLError("Input validation failed");
    }
  }
};
