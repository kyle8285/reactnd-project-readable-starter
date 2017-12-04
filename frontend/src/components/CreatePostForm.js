import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { addPostApi } from '../actions/posts';

class CreatePostForm extends Component {
  state = {
    author: '',
    title: '',
    body: '',
    category: '',
    addPostSuccess: false,
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { author, title, body, category } = this.state;
    if (!author || !title || !body || !category) {
      return;
    }
    const id = `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    const timestamp = Date.now();
    this.props.addPost({title, body, author, category, id, timestamp})
      .then(() => this.onAddPostSuccess());
  }

  onAddPostSuccess = () => this.setState({
    addPostSuccess: true
  })

  componentDidMount() {
    const {search} = this.props.location;
    const {category} = queryString.parse(search);
    if (category) this.setState({category})
  }

  render() {
    return (
      <div>
        {!this.state.addPostSuccess
        ?
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor='author'>Author</label>
              <input type="text" name="author" value={this.state.author} onChange={this.handleChange} autoFocus/>
            </fieldset>
            <fieldset>
              <label htmlFor='title'>Title</label>
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
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
          <Redirect to={`/category/${this.state.category}`}/>
        }
      </div>
    )
  }
}

function mapStateToProps({categories}) {
  return {
    categories,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: (post) => dispatch(addPostApi(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
