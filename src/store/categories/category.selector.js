import { createSelector } from 'reselect';

const categoriesStateNode = (state) => state.categories;

const selectCategories = createSelector(
  [categoriesStateNode],
  (categoriesSlice) => categoriesSlice.categories
);

export const getCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
