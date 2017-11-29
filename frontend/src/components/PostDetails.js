import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, getCommentsApi, deletePostApi } from '../actions';
import CommentForm from './CommentForm';
import { MdEdit, MdDelete } from 'react-icons/lib/md';

class PostDetails extends Component {
  state = {
    showCommentForm: false,
  }

  showCommentForm = () => this.setState({
    showCommentForm: true
  })

  handleDelete = postId => this.props.deletePost(postId)

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const {post, comments} = this.props;
    const {showCommentForm} = this.state;
    return (
      <div>
      {post
        ? (
          <div>
            <h3 className='title'>{post.title}</h3>
            <Link to={`/post/${post.id}/edit`}><MdEdit/></Link>
            <button className='btn-icon' onClick={this.handleDelete.bind(this, post.id)}>
              <MdDelete/>
            </button>
            <p>Author: {post.author}</p>
            <p>Category: {post.category}</p>
            <p>Last Updated: {post.datetime}</p>
            <p>VoteScore: {post.voteScore}</p>
            <p>{post.body}</p>
            <button onClick={this.showCommentForm}>Add Comment</button>
            {comments.map(comment => (
              <div key={comment.id}>
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{new Date(comment.timestamp).toString()}</p>
                <p>{comment.voteScore}</p>
              </div>
            ))}
            {showCommentForm && <CommentForm postId={post.id}/>}
          </div>
        ) : (
          <div>No post available</div>
        )}
      </div>
    )
  }
}

function mapStateToProps({byId, categories, commentsById}, ownProps) {
  return {
    post: byId[ownProps.match.params.id],
    comments: Object.values(commentsById).filter(comment => (
      comment.parentId === ownProps.match.params.id
    )),
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: postId => dispatch(fetchPost(postId)),
    deletePost: postId => dispatch(deletePostApi(postId)),
    getComments: postId => dispatch(getCommentsApi(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
