import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Post from './Post';
import { fetchPosts } from '../actions';

class PostList extends Component {

  state = {
    orderBy: 'voteScore',
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

  componentDidMount() {
    this.props.getAllPosts();
  }

  componentWillReceiveProps(nextProps) {
    // TODO: figure out a better way to handle this (ie, getting
    // posts when the category changes)
    const previousCategory = this.props.match.params.category;
    const currentCategory = nextProps.match.params.category;
    if (previousCategory !== currentCategory) {
      this.props.getAllPosts();
    }
  }

  render() {
    const {posts} = this.props;
    const orderFunc = this.orderFunc();
    // TODO: is slicing necessary?
    const sortedPosts = posts.slice().sort(orderFunc);

    return (
      <div>
        {!sortedPosts.length
        ? (
          <div>There are no posts</div>
        ) : (
          <div>
            <h2>Posts</h2>
            <Link to='/post/create'>Create New Post</Link>
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
        )}
      </div>
    )
  }
}

function mapStateToProps({allIds, byId}, ownProps) {
  let posts = allIds.map(id => byId[id]);
  const {category} = ownProps.match.params;
  if (category) {
    posts = posts.filter(post => post.category === category);
  }
  return {
    posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(fetchPosts()),
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
