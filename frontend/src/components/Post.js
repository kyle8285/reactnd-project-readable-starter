import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Post = ({post}) => (
  <li>
    <h3>{post.title}</h3>
    <Link to={`/post/${post.id}/edit`}>Edit Post</Link>
    <h4>{post.author}</h4>
    <ul>
      <li>Category: {post.category}</li>
      <li>VoteScore: {post.voteScore}</li>
      <li>Created: {new Date(post.timestamp).toString()}</li>
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
