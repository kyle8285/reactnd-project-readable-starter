import { combineReducers } from 'redux';
import merge from 'lodash/merge';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  EDIT_POST,
} from '../actions';

const byId = (state={}, action) => {
  switch(action.type) {
    // case RECEIVE_POST:
    case ADD_POST:
    case RECEIVE_POSTS:
      if (action.entities) {
        return merge({}, state, action.entities.posts);
      }
      break;
    default:
      return state;

  }
}
const allIds = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_POSTS:
      if (action.result) {
        return [...state, ...action.result];
      }
      break;
    case ADD_POST:
      return [...state, action.result];
    default:
      return state;
  }
}
function categories(state=[], action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      const {categories} = action;
      return [...state, ...categories]
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  byId,
  allIds,
});
