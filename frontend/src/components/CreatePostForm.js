import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { addPostApi } from '../actions';

class CreatePostForm extends Component {
  state = {
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
    const { title, body, category } = this.state;
    if (!title || !body || !category) {
      return;
    }
    const author = 'me';
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
            <label>
              Title:
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} autoFocus/>
            </label>
            <label>
              Category:
              <select name="category" value={this.state.category} onChange={this.handleChange}>
                <option value={''} disabled>Select a category</option>
                {this.props.categories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </label>
            <label>
              Body:
              <textarea type="text" name="body" value={this.state.body} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="Submit"/>
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
