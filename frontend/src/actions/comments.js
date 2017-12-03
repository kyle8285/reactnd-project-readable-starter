import { normalize } from 'normalizr';
import * as Api from '../utils/api';
import { commentSchema, commentListSchema } from '../schemas/post';

export const ADD_COMMENT        = 'ADD_COMMENT';
export const EDIT_COMMENT       = 'EDIT_COMMENT';
export const DELETE_COMMENT     = 'DELETE_COMMENT';
export const RECEIVE_COMMENTS   = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT    = 'RECEIVE_COMMENT';

// fetch all comments
export const getCommentsApi = postId => dispatch => (
  Api.getComments(postId)
    .then(comments => {
      const normalized = normalize(comments, commentListSchema);
      dispatch(receiveComments(normalized));
    })
);

const receiveComments = ({entities, result}) => ({
  type: RECEIVE_COMMENTS,
  entities,
  result,
});

// add comment
export const addCommentApi = comment => dispatch => (
  Api.addComment(comment)
  .then(comment => {
    const normalized = normalize(comment, commentSchema);
    dispatch(addComment(normalized));
  })
);

const addComment = ({entities, result}) => ({
  type: ADD_COMMENT,
  entities,
  result,
});

// edit comment
export const editCommentApi = comment => dispatch => (
  Api.editComment(comment)
  .then(comment => {
    const normalized = normalize(comment, commentSchema);
    dispatch(editComment(normalized));
  })
);

const editComment = ({entities, result}) => ({
  type: EDIT_COMMENT,
  entities,
  result,
});

// delete comment
export const deleteCommentApi = commentId => dispatch => (
  Api.deleteComment(commentId)
    .then(comment => {
      const normalized = normalize(comment, commentSchema);
      dispatch(deleteComment(normalized));
    }
  )
);

const deleteComment = ({entities, result}) => ({
  type: DELETE_COMMENT,
  entities,
  result,
});

// vote for comment
export const voteForComment = (commentId, vote) => dispatch => (
  Api.voteForComment(commentId, vote)
    .then(comment => {
      const normalized = normalize(comment, commentSchema);
      dispatch(receiveComment(normalized));
  })
);

const receiveComment = ({entities, result}) => ({
  type: RECEIVE_COMMENT,
  entities,
  result
});

