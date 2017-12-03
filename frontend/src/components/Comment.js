import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/lib/md';
import moment from 'moment';

import { deleteCommentApi } from '../actions/comments';
import VoteScore from './VoteScore';
import EditCommentForm from './EditCommentForm';

class Comment extends Component {
  state = {
    editComment: false,
  };

  toggleEditComment = () => this.setState({
    editComment: !this.state.editComment
  });

  handleDelete = commentId => {
    const result = window.confirm('Are you sure you want to delete this comment?');
    if (result) this.props.deleteComment(commentId);
  }

  render() {
    const { comment } = this.props;
    const { editComment } = this.state;
    return (
      <div className='comment'>
        <div>
          <span className='comment-author'>{comment.author} </span>
          <span className='weight-light font-small'>at {moment(comment.timestamp).format('lll')}</span>
        </div>
        <div>
          <span>{comment.voteScore}</span> <VoteScore comment={comment}/>
          <button className='btn-icon' onClick={this.toggleEditComment}>
            <MdEdit/>
          </button>
          <button className='btn-icon' onClick={this.handleDelete.bind(this, comment.id)}>
            <MdDelete/>
          </button>
        </div>
        {editComment
          ? <EditCommentForm comment={comment} onSuccess={this.toggleEditComment}/>
          : <p className='comment-body'>{comment.body}</p>
        }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: commentId => dispatch(deleteCommentApi(commentId)),
  }
}

export default connect(null, mapDispatchToProps)(Comment);
