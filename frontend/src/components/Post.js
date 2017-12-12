import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MdEdit, MdDelete } from 'react-icons/lib/md';

import VoteScore from './VoteScore';
import { deletePostApi } from '../actions/posts';

const Post = (props) => {

  const handleDelete = postId => {
    const result = window.confirm('Are you sure you want to delete this post?');
    if (result) props.deletePost(postId);
  }

  const { post } = props;
  return (
    <div className='post'>
      <h3 className='title'>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
        <VoteScore post={post}/><span className='font-small'> {post.voteScore}</span>
      </h3>
      <div>
        <span className='comment-author'>{post.author} </span>
        <span className='weight-light font-small'>at {moment(post.timestamp).format('lll')}</span>
        <Link className='link-icon' to={`/post/${post.id}/edit`}>
          <MdEdit/>
        </Link>
        <button className='btn-icon' onClick={() => handleDelete(post.id)}>
          <MdDelete/>
        </button>
      </div>
      <div>
        <span className='weight-light small'>in </span>
        <span>{post.category} </span>
        <span className='weight-light small'>with </span>
        <span>{post.commentCount} <Link to={`/post/${post.id}`}>comments</Link></span>
      </div>
      {props.showBody && <p>{post.body}</p>}
    </div>
  )
}

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

function mapDispatchToProps(dispatch) {
  return {
    deletePost: postId => dispatch(deletePostApi(postId)),
  }
}

export default connect(null, mapDispatchToProps)(Post);
