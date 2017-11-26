import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends Component {

  state = {
    orderBy: 'timestamp',
    order: 'desc',
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  orderFunc = () => {
    const {order, orderBy} = this.state;
    if (order === 'desc') {
      return (a,b) => a[orderBy] < b[orderBy];
    } else if (order === 'asc') {
      return (a,b) => a[orderBy] > b[orderBy];
    }
  }

  render() {
    const {posts} = this.props;
    const orderFunc = this.orderFunc();
    // is slicing necessary?
    const sortedPosts = posts.slice().sort(orderFunc);

    return (
      <div>
        <label>Order By:
          <select value={this.state.orderBy} name='orderBy' onChange={this.handleChange}>
            <option value='timestamp'>Last Updated</option>
            <option value='voteScore'>VoteScore</option>
          </select>
        </label>
        <label>Order:
          <select value={this.state.order} name='order' onChange={this.handleChange}>
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </label>
        <ul>
          {sortedPosts.map(post => <Post key={post.id} post={post} />)}
        </ul>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      voteScore: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

export default PostList;
