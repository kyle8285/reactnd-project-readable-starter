import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/lib/md';
import { voteForPost, voteForComment } from '../actions';

class VoteScore extends Component {

  handleVote = (vote) => {
    const {post,comment,voteForPost, voteForComment} = this.props;
    if (post) {
      voteForPost(post.id, vote);
    } else if (comment) {
      voteForComment(comment.id, vote);
    }
  }
  render() {
    return (
      <span>
        <MdArrowDownward onClick={this.handleVote.bind(this,'downVote')} className='md-arrow-downward'/>
        <MdArrowUpward onClick={this.handleVote.bind(this,'upVote')} className='md-arrow-upward'/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForPost: (postId, vote) => dispatch(voteForPost(postId, vote)),
    voteForComment: (commentId, vote) => dispatch(voteForComment(commentId, vote)),
  }
}

export default connect(null, mapDispatchToProps)(VoteScore);
