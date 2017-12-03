import { normalize } from 'normalizr';
import * as Api from '../utils/api';
import { postSchema, postListSchema } from '../schemas/post';

export const ADD_POST           = 'ADD_POST';
export const RECEIVE_POSTS      = 'RECEIVE_POSTS';
export const RECEIVE_POST       = 'RECEIVE_POST';
export const EDIT_POST          = 'EDIT_POST';
export const DELETE_POST        = 'DELETE_POST';

// fetch all posts
export const fetchPosts = () => dispatch => (
  Api.getAllPosts()
    .then(posts => {
      const normalized = normalize(posts, postListSchema);
      dispatch(receivePosts(normalized));
    })
);

const receivePosts = ({entities, result}) => ({
  type: RECEIVE_POSTS,
  entities,
  result,
});

// fetch single post
export const fetchPost = postId => dispatch => (
  Api.getPost(postId)
  .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(receivePost(normalized));
  })
);

const receivePost = ({entities, result}) => ({
  type: RECEIVE_POST,
  entities,
  result,
});

// add post
export const addPostApi = post => dispatch => (
  Api.addPost(post)
    .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(addPost(normalized));
    })
);

const addPost = ({entities, result}) => ({
  type: ADD_POST,
  entities,
  result,
});

// edit post
export const editPostApi = post => dispatch => (
  Api.editPost(post)
  .then(post => {
    const normalized = normalize(post, postSchema);
    dispatch(editPost(normalized));
  })
);

const editPost = ({entities, result}) => ({
  type: EDIT_POST,
  entities,
  result,
});

// delete post
export const deletePostApi = postId => dispatch => (
  Api.deletePost(postId)
  .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(deletePost(normalized));
  })
);

const deletePost = ({entities, result}) => ({
  type: DELETE_POST,
  entities,
  result,
});

// vote for post
export const voteForPost = (postId, vote) => dispatch => (
  Api.voteForPost(postId, vote)
    .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(receivePost(normalized));
  })
);
