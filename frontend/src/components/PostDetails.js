import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPost } from '../actions/posts';
import { getCommentsApi } from '../actions/comments';
import Post from './Post';
import Comment from './Comment';
import CommentForm from './CommentForm';

class PostDetails extends Component {
  state = {
    addComment: false,
  }

  toggleAddComment = () => this.setState({
    addComment: !this.state.addComment
  })

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
      {post ?
          <div>
            <div className='post-detail'>
              <Post post={post} showBody={true}/>
            </div>
            <button className='btn btn-info' onClick={this.toggleAddComment}>Add Comment</button>
            {addComment && <button className='btn btn-warning' onClick={this.toggleAddComment}>Cancel</button>}
            {addComment && <CommentForm postId={post.id} onAddCommentSuccess={this.toggleAddComment}/>}
            {sortedComments.map(comment => <Comment key={comment.id} comment={comment}/>)}
          </div>
        :
          <div>Oops! This post is no longer available.</div>
        }
      </div>
    )
  }
}

function mapStateToProps({postsById, categories, commentsById}, ownProps) {
  return {
    post: postsById[ownProps.match.params.id],
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
