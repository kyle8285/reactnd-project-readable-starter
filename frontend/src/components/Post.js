import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MdEdit from 'react-icons/lib/md/edit';

import VoteScore from './VoteScore';

const Post = ({post}) => (
  <li>
    <h3 className='title'>{post.title}</h3>
    <Link to={`/post/${post.id}/edit`}><MdEdit/> Edit</Link>
    <p>{new Date(post.timestamp).toString()} by {post.author}</p>
    <ul>
      <li>Category: {post.category}</li>
      <li>
        VoteScore: {post.voteScore}
        <VoteScore post={post}/>
      </li>
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
