import { combineReducers } from 'redux';
import { RECEIVE_CATEGORIES, RECEIVE_POSTS, ADD_POST } from '../actions';

function posts(state={posts: []}, action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      const {posts} = action;
      return {
        ...state,
        posts,
      }
    case ADD_POST:
      const {post} = action;
      return {
        ...state,
        posts: [...state.posts, post]
      }
    default:
      return state;
  }
}

function categories(state={categories: []}, action) {
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      const {categories} = action;
      return {
        ...state,
        categories,
      }
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
});
