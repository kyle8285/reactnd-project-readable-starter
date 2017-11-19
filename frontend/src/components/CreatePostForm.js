import React, { Component } from 'react';
import * as Api from '../utils/api';

class CreatePostForm extends Component {
  state = {
    title: '',
    body: '',
    category: 'react',
  };

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const author = 'me';
    const id = `${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;
    const timestamp = Date.now();
    Api.addPost({...this.state, author, id, timestamp})
      .then(res => console.log(res))
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        </label>
        <label>
          Category:
          <select name="category" value={this.state.category} onChange={this.handleChange}>
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
    )
  }
}

export default CreatePostForm;
