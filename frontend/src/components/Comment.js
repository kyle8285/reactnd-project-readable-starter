import React, { Component } from 'react';
import VoteScore from './VoteScore';
import EditCommentForm from './EditCommentForm';
import { MdEdit, MdDelete } from 'react-icons/lib/md';

class Comment extends Component {
  state = {
    editComment: false,
  };

  toggleEdit = () => this.setState({
    editComment: !this.state.editComment
  });

  handleDelete = commentId => {

  }

  render() {
    const { comment } = this.props;
    const { editComment } = this.state;
    return (
      <div className='comment'>
        <div>
          <span className='comment-author'>{comment.author} </span>
          <span className='comment-time small'>at {new Date(comment.timestamp).toString()}</span>
        </div>
        <div>
          <span>{comment.voteScore}</span> <VoteScore comment={comment}/>
          <button className='btn-icon' onClick={this.toggleEdit}>
            <MdEdit/>
          </button>
          <button className='btn-icon' onClick={this.handleDelete.bind(this, comment.id)}>
            <MdDelete/>
          </button>
        </div>
        {editComment
          ? <EditCommentForm comment={comment} onSuccess={this.toggleEdit}/>
          : <p className='comment-body'>{comment.body}</p>
        }
      </div>
    )
  }
}

export default Comment;
