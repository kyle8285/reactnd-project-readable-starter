import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/lib/md';
import moment from 'moment';

import { fetchPost, deletePostApi } from '../actions/posts';
import { getCommentsApi } from '../actions/comments';
import Comment from './Comment';
import CommentForm from './CommentForm';
import VoteScore from './VoteScore';

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
            <span> <VoteScore post={post}/>{post.voteScore}</span>
            <div>
              <Link className='link-icon' to={`/post/${post.id}/edit`}>
                <MdEdit/>
              </Link>
              <button className='btn-icon' onClick={this.handleDelete.bind(this, post.id)}>
                <MdDelete/>
              </button>
            </div>
            <div>
              <span className='comment-author'>{post.author} </span>
              <span className='weight-light font-small'>at {moment(post.timestamp).format('lll')}</span>
            </div>
            <div>
              <span className='weight-light small'>in </span>
              <span>{post.category} </span>
              <span className='weight-light small'>with </span>
              <span>{post.commentCount} comments</span>
            </div>
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
