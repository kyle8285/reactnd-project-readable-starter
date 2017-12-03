import { merge, uniq, omit, without } from 'lodash';

import { ADD_COMMENT, DELETE_COMMENT } from '../actions/comments';
import { RECEIVE_POSTS, RECEIVE_POST, ADD_POST,
          EDIT_POST, DELETE_POST, } from '../actions/posts';

export const byId = (state={}, action) => {
  let postId;
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
    case DELETE_COMMENT:
      postId = Object.values(action.entities.comments)[0].parentId;
      return {
        ...state,
        [postId]: state[postId],
        commentCount: state[postId].commentCount--
      }
    case ADD_COMMENT:
      postId = Object.values(action.entities.comments)[0].parentId;
      return {
        ...state,
        [postId]: state[postId],
        commentCount: state[postId].commentCount++
      }
    default:
      return state;
  }
}

export const allIds = (state=[], action) => {
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
