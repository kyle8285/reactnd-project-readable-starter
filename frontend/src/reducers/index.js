import { combineReducers } from 'redux';
import {
  RECEIVE_CATEGORIES,
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  UPDATE_POST, } from '../actions';

function posts(state=[], action) {
  switch(action.type) {
    case RECEIVE_POSTS:
      const {posts} = action;
      return [...state, ...posts];
    case ADD_POST:
      const {post} = action;
      return [...state, post];
    default:
      return state;
  }
}

function post(state={}, action) {
  const {post} = action;
  switch(action.type) {
    case RECEIVE_POST:
      return {...state, ...post};
    case UPDATE_POST:
      return {...state, ...post};
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
  posts,
  post,
});
