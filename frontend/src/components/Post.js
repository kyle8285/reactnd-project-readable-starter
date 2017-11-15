import React from 'react';
import PropTypes from 'prop-types';

const Post = ({post}) => (
  <li>
    <h3>{post.title}</h3>
    <h4>{post.author}</h4>
    <ul>
      <li>Category: {post.category}</li>
      <li>VoteScore: {post.voteScore}</li>
      <li>Created: {Date(post.timestamp)}</li>
    </ul>
  </li>
)

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
}

export default Post;
