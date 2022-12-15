import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';

describe('fetchCategoriesStart action', () => {
  it('should create the fetchCategoriesStart action', () => {
    expect(fetchCategoriesStart().type).toEqual(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
    );
  });
});

describe('fetchCategoriesSuccess action', () => {
  it('should create the fetchCategoriesSuccess action', () => {
    expect(fetchCategoriesSuccess().type).toEqual(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS
    );
  });
});
describe('fetchCategoriesFailed action', () => {
  it('should create the fetchCategoriesFailed action', () => {
    expect(fetchCategoriesFailed().type).toEqual(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED
    );
  });
});
