import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, getCommentsApi, deletePostApi } from '../actions';
import Comment from './Comment';
import CommentForm from './CommentForm';
import VoteScore from './VoteScore';
import { MdEdit, MdDelete } from 'react-icons/lib/md';

class PostDetails extends Component {
  state = {
    addComment: false,
  }

  toggleAddComment = () => this.setState({
    addComment: !this.state.addComment
  })

  handleDelete = postId => {
    const result = window.confirm('Are you sure you want to delete this post?');
    if (result) this.props.deletePost(postId);
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getComments(this.props.match.params.id);
  }

  render() {
    const {addComment} = this.state;
    const {post, comments} = this.props;
    const sortedComments = [...comments].sort((a,b) => a.timestamp < b.timestamp);
    return (
      <div>
      {post
        ? (
          <div className='post-detail'>
            <h3 className='title'>{post.title}</h3>
            <Link className='link-icon' to={`/post/${post.id}/edit`}>
              <MdEdit/>
            </Link>
            <button className='btn-icon' onClick={this.handleDelete.bind(this, post.id)}>
              <MdDelete/>
            </button>
            <p>Author: {post.author}</p>
            <p>Category: {post.category}</p>
            <p>Last Updated: {new Date(post.timestamp).toString()}</p>
            <p>{post.voteScore} <VoteScore post={post}/></p>
            <p>{post.commentCount} Comment{post.commentCount !== 1 && <span>s</span>}</p>
            <p>{post.body}</p>
            <button onClick={this.toggleAddComment}>Add Comment</button>
            {addComment && <button onClick={this.toggleAddComment}>Cancel</button>}
            {addComment && <CommentForm postId={post.id} onAddCommentSuccess={this.toggleAddComment}/>}
            {sortedComments.map(comment => <Comment key={comment.id} comment={comment}/>)}
          </div>
        ) : (
          <div>Oops! This post is no longer available.</div>
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
