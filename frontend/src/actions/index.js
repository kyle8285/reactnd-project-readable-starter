import { normalize } from 'normalizr';
import * as Api from '../utils/api';
import { postSchema,
          postListSchema,
          commentSchema,
          commentListSchema } from '../schemas/post';

export const ADD_POST           = 'ADD_POST';
export const RECEIVE_POSTS      = 'RECEIVE_POSTS';
export const RECEIVE_POST       = 'RECEIVE_POST';
export const EDIT_POST          = 'EDIT_POST';
export const DELETE_POST        = 'DELETE_POST';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const ADD_COMMENT        = 'ADD_COMMENT';
export const EDIT_COMMENT       = 'EDIT_COMMENT';
export const DELETE_COMMENT     = 'DELETE_COMMENT';
export const RECEIVE_COMMENTS   = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT    = 'RECEIVE_COMMENT';

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
  .then(post => {
    const normalized = normalize(post, postSchema);
    dispatch(editPost(normalized));
  })
);

export const receivePosts = ({entities, result}) => ({
  type: RECEIVE_POSTS,
  entities,
  result,
});

export const receivePost = ({entities, result}) => ({
  type: RECEIVE_POST,
  entities,
  result,
});

export const editPost = ({entities, result}) => ({
  type: EDIT_POST,
  entities,
  result,
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
  .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(receivePost(normalized));
  })
);

export const deletePostApi = postId => dispatch => (
  Api.deletePost(postId)
  .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(deletePost(normalized));
  })
);

export const deletePost = ({entities, result}) => ({
  type: DELETE_POST,
  entities,
  result,
});

export const voteForPost = (postId, vote) => dispatch => (
  Api.voteForPost(postId, vote)
    .then(post => {
      const normalized = normalize(post, postSchema);
      dispatch(receivePost(normalized));
  })
);

export const voteForComment = (commentId, vote) => dispatch => (
  Api.voteForComment(commentId, vote)
    .then(comment => {
      const normalized = normalize(comment, commentSchema);
      dispatch(receiveComment(normalized));
  })
);

export const receiveComment = ({entities, result}) => ({
  type: RECEIVE_COMMENT,
  entities,
  result
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = () => dispatch => (
  Api.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
);

export const addCommentApi = comment => dispatch => (
  Api.addComment(comment)
  .then(comment => {
    const normalized = normalize(comment, commentSchema);
    dispatch(addComment(normalized));
  })
);

export const addComment = ({entities, result}) => ({
  type: ADD_COMMENT,
  entities,
  result,
});

export const editCommentApi = comment => dispatch => (
  Api.editComment(comment)
  .then(comment => {
    const normalized = normalize(comment, commentSchema);
    dispatch(editComment(normalized));
  })
);

export const editComment = ({entities, result}) => ({
  type: EDIT_COMMENT,
  entities,
  result,
});

export const deleteCommentApi = commentId => dispatch => (
  Api.deleteComment(commentId)
    .then(comment => {
      const normalized = normalize(comment, commentSchema);
      dispatch(deleteComment(normalized));
    }
  )
);

export const deleteComment = ({entities, result}) => ({
  type: DELETE_COMMENT,
  entities,
  result,
});

export const getCommentsApi = postId => dispatch => (
  Api.getComments(postId)
    .then(comments => {
      const normalized = normalize(comments, commentListSchema);
      dispatch(receiveComments(normalized));
    })
);

export const receiveComments = ({entities, result}) => ({
  type: RECEIVE_COMMENTS,
  entities,
  result,
});
