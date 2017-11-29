import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, getCommentsApi } from '../actions';
import CommentForm from './CommentForm';

class PostDetails extends Component {
  state = {
    showCommentForm: false,
  }

  showCommentForm = () => this.setState({
    showCommentForm: true
  })

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
            <h3>{post.title}</h3>
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
    getComments: postId => dispatch(getCommentsApi(postId)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
