import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const PostList = ({posts}) => (
  <ul>
    {posts.map(post => <Post key={post.id} post={post} />)}
  </ul>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

export default PostList;
