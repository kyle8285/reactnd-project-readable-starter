import * as Api from '../utils/api';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const addPost = post => ({
  type: ADD_POST,
  post,
});

export const addPostApi = (post) => dispatch => (
  Api.addPost(post)
    .then(post => dispatch(addPost(post)))
);

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const fetchPosts = () => dispatch => (
  Api.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
);

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch => (
  Api.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);
