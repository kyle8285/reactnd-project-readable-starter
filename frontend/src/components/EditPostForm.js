import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchPost, editPostApi } from '../actions/posts';

class EditPostForm extends Component {
  state = {
    author: '',
    title: '',
    category: '',
    body: '',
    editPostSuccess: false,
  };

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(
      Object.assign(this.state, nextProps.post)
    );
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body, category, author, id } = this.state;
    if (!title || !body) {
      return;
    }
    const timestamp = Date.now();
    this.props.editPost({title, body, category, author, id, timestamp})
      .then(() => this.onEditPostSuccess());
  }

  onEditPostSuccess = () => this.setState({
    editPostSuccess: true
  })

  render() {
    return (
      <div>
        {!this.state.editPostSuccess
        ?
          <form onSubmit={this.handleSubmit}>
            <fieldset disabled>
              <label htmlFor='author'>Author</label>
              <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
            </fieldset>
            <fieldset>
              <label htmlFor='title'>Title</label>
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} autoFocus/>
            </fieldset>
            <fieldset>
              <label>Category</label>
              <select name="category" value={this.state.category} onChange={this.handleChange}>
              <option value={''} disabled>Select a category</option>
              {this.props.categories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor='body'>Body</label>
              <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange}/>
            </fieldset>
            <fieldset>
              <input type="submit" value="Submit"/>
            </fieldset>
          </form>
        :
          <Redirect to={`/${this.state.category}/${this.props.match.params.id}`}/>
        }
      </div>
    )
  }
}

function mapStateToProps({postsById, categories}, ownProps) {
  return {
    post: postsById[ownProps.match.params.id],
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: postId => dispatch(fetchPost(postId)),
    editPost: post => dispatch(editPostApi(post)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPostForm);
