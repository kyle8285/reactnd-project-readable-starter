import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/lib/md';
import { voteForPost } from '../actions';

class VoteScore extends Component {

  handleVote = (vote) => {
    if (this.props.post) {
      this.props.voteForPost(this.props.post.id, vote);
    } else if (this.props.comment) {
      this.props.voteForComment(vote);
    }
  }
  render() {
    return (
      <span>
        <MdArrowUpward onClick={() => this.handleVote('upVote')} className='md-arrow-upward'/>
        <MdArrowDownward onClick={() => this.handleVote('downVote')} className='md-arrow-downward'/>
      </span>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    voteForPost: (postId, vote) => dispatch(voteForPost(postId, vote)),
    // voteOnComment: (commentId, vote) => dispatch(voteOnComment(commentId, vote)),
  }
}

export default connect(null, mapDispatchToProps)(VoteScore);
