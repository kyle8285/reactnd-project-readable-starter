import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, editPostApi } from '../actions';

class EditPostForm extends Component {
  state = {
    title: '',
    category: '',
    body: '',
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
    const timestamp = Date.now(); //update the timestamp?
    this.props.editPost({
      title, body, category, author, id, timestamp,
    });
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

function mapStateToProps({byId, categories}, ownProps) {
  return {
    post: byId[ownProps.match.params.id],
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
