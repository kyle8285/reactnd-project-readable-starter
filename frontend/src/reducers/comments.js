import { merge, uniq, omit, without } from 'lodash';

import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RECEIVE_COMMENTS,
  RECEIVE_COMMENT,
} from '../actions/comments';

export const commentsById = (state={}, action) => {
  switch(action.type) {
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case RECEIVE_COMMENT:
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

export const commentsAllIds = (state=[], action) => {
  switch(action.type) {
    case RECEIVE_COMMENT:
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
