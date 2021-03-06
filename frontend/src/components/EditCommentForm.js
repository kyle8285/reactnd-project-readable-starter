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
    const {id, body} = this.state;
    if (!body) return;
    const timestamp = Date.now();
    this.props.editComment({id, body, timestamp})
      .then(() => this.props.onSuccess());
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor='body'>Comment</label>
          <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange} autoFocus/>
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
    editComment: comment => dispatch(editCommentApi(comment)),
  }
}

export default connect(null, mapDispatchToProps)(EditCommentForm);
