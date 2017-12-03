import { combineReducers } from 'redux';
import { categories } from './categories';
import { postsById, postsAllIds } from './posts';
import { commentsById, commentsAllIds } from './comments';

export default combineReducers({
  categories,
  postsById,
  postsAllIds,
  commentsById,
  commentsAllIds,
});
