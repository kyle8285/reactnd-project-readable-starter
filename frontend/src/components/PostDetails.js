import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, getCommentsApi, deletePostApi } from '../actions';
import Comment from './Comment';
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
    const {showCommentForm} = this.state;
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
            <p>Last Updated: {post.datetime}</p>
            <p>VoteScore: {post.voteScore}</p>
            <p>{post.body}</p>
            <button onClick={this.showCommentForm}>Add Comment</button>
            {showCommentForm && <CommentForm postId={post.id}/>}
            {sortedComments.map(comment => <Comment key={comment.id} comment={comment}/>)}
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
