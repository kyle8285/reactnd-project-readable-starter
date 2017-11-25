import { normalize } from 'normalizr';
import * as Api from '../utils/api';
import { postSchema, postListSchema } from '../schemas/post';

export const ADD_POST = 'ADD_POST';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const EDIT_POST = 'EDIT_POST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const addPost = ({entities, result}) => ({
  type: ADD_POST,
  entities,
  result,
});

export const addPostApi = post => dispatch => (
  Api.addPost(post)
    .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(addPost(normalized));
    })
);

export const editPostApi = post => dispatch => (
  Api.editPost(post)
    .then(post => dispatch(editPost(post)))
  // .then(post => {
  //   const normalized = normalize(post, postSchema);
  // })
);

export const receivePosts = ({entities, result}) => ({
  type: RECEIVE_POSTS,
  entities,
  result,
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post,
});

export const editPost = post => ({
  type: EDIT_POST,
  post,
});

export const fetchPosts = () => dispatch => (
  Api.getAllPosts()
    .then(posts => {
      const normalized = normalize(posts, postListSchema);
      dispatch(receivePosts(normalized));
    })
);

export const fetchPost = postId => dispatch => (
  Api.getPost(postId)
    .then(post => dispatch(receivePost(post)))
);

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch => (
  Api.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);
