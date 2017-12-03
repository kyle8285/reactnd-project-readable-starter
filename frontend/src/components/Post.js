import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import VoteScore from './VoteScore';

const Post = ({post}) => (
  <li>
    <h3 className='title'>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </h3>
    <div>
      <span className='comment-author'>{post.author} </span>
      <span className='weight-light font-small'>at {moment(post.timestamp).format('lll')}</span>
      <span> <VoteScore post={post}/>{post.voteScore}</span>
    </div>
    <div>
      <span className='weight-light small'>in </span>
      <span>{post.category} </span>
      <span className='weight-light small'>with </span>
      <span>{post.commentCount} <Link to={`/post/${post.id}`}>comments</Link></span>
    </div>
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
