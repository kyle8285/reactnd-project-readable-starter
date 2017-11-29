import React, { Component } from 'react';
import VoteScore from './VoteScore';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className='comment'>
        <p>
          <span className='comment-author'>{comment.author} </span>
          <span className='comment-time small'>at {new Date(comment.timestamp).toString()}</span>
          <span> {comment.voteScore} <VoteScore comment={comment}/></span>
        </p>
        <p className='comment-body'>{comment.body}</p>
      </div>
    )
  }
}

export default Comment;
