import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCommentApi } from '../actions/comments';

class CommentForm extends Component {
  state = {
    author: '',
    body: '',
  }

  handleChange = (e) => {
    const {value, name} = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    const parentId = this.props.postId;
    const timestamp = Date.now();
    const {author, body} = this.state;
    this.props.addComment({id, parentId, timestamp, body, author})
      .then(() => this.props.onAddCommentSuccess());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label for='author'>Author</label>
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange} autoFocus/>
        </fieldset>
        <fieldset>
          <label for='body'>Comment</label>
          <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange}/>
        </fieldset>
        <fieldset>
          <input type="submit" value="Submit"/>
        </fieldset>
      </form>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(addCommentApi(comment)),
  }
}

export default connect(null, mapDispatchToProps)(CommentForm);
