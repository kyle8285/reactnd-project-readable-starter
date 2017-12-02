import { combineReducers } from 'redux';
import { merge, uniq, omit, without } from 'lodash';

import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RECEIVE_COMMENTS,
} from '../actions';

const byId = (state={}, action) => {
  switch(action.type) {
    case RECEIVE_POST:
    case ADD_POST:
    case EDIT_POST:
    case RECEIVE_POSTS:
      if (action.entities) {
        return merge({}, state, action.entities.posts);
      }
      break;
    case DELETE_POST:
      if (action.entities) {
        return omit({...state}, Object.keys(action.entities.posts)[0]);
      }
      break;
    default:
      return state;
  }
}

const commentsById = (state={}, action) => {
  switch(action.type) {
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case RECEIVE_COMMENTS:
      if (action.entities) {
        return merge({}, state, action.entities.comments);
      }
      break;
    case DELETE_COMMENT:
      if (action.entities) {
        return omit({...state}, Object.keys(action.entities.comments)[0]);
      }
      break;
    default:
      return state;
  }
}

const commentsAllIds = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_COMMENTS:
      if (action.result) {
        return uniq([
          ...state,
          ...action.result
        ]);
      }
      break;
    case ADD_COMMENT:
      if (action.result) {
        return [...state, action.result];
      }
      break;
    case DELETE_COMMENT:
      if (action.result) {
        return without(state, action.result);
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
        return uniq([
          ...state,
          ...action.result
        ]);
      }
      break;
    case ADD_POST:
      return [...state, action.result];
    case DELETE_POST:
      return without(state, action.result)
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
  commentsById,
  commentsAllIds,
});
