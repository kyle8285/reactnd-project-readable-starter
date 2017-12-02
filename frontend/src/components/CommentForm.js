import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCommentApi } from '../actions';

class CommentForm extends Component {
  state = {
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
    const {body} = this.state;
    const author = 'me';
    this.props.addComment({id, parentId, timestamp, body, author})
      .then(() => this.props.onAddCommentSuccess());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Add Comment:
          <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange} autoFocus/>
        </label>
        <input type="submit" value="Submit"/>
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
