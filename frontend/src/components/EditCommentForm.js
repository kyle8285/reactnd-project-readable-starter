import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCommentApi } from '../actions/comments';

class EditCommentForm extends Component {
  state = {}

  handleChange = (e) => {
    const {value, name} = e.target;
    this.setState({
      [name]: value,
    });
  }

  componentDidMount() {
    // Is this bad?
    this.setState(
      Object.assign(this.state, this.props.comment)
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = Date.now();
    const {id, body } = this.state;
    this.props.editComment({id, body, timestamp})
      .then(() => this.props.onSuccess());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange} autoFocus/>
        <input type="submit" value="Submit"/>
      </form>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: comment => dispatch(editCommentApi(comment)),
  }
}

export default connect(null, mapDispatchToProps)(EditCommentForm);
