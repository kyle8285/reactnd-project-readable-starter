import { RECEIVE_CATEGORIES } from '../actions/categories';

export const categories = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      const {categories} = action;
      return [...state, ...categories]
    default:
      return state;
  }
}
