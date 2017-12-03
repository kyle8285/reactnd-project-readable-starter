import { combineReducers } from 'redux';
import { categories } from './categories';
import { byId, allIds } from './posts';
import { commentsById, commentsAllIds } from './comments';

export default combineReducers({
  categories,
  byId,
  allIds,
  commentsById,
  commentsAllIds,
});
