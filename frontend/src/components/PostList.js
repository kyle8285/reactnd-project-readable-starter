import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Post from './Post';
import { fetchPosts } from '../actions/posts';

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
    const {orderBy} = this.state;
    const numberTypes = [
      'timestamp', 'voteScore', 'commentCount',
    ];
    const letterTypes = [
      'category', 'author', 'title',
    ];

    const compareNumbers = (a,b) => b - a;
    const compareLetters = (a,b) => {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };

    if (numberTypes.includes(orderBy)) {
      return (a,b) => compareNumbers(a[orderBy], b[orderBy])
    } else if (letterTypes.includes(orderBy)) {
      return (a,b) => compareLetters(a[orderBy].toLowerCase(), b[orderBy].toLowerCase())
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
    const {posts}     = this.props;
    const {category}  = this.props.match.params;
    const {order}     = this.state;
    const orderFunc   = this.orderFunc();
    const sortedPosts = posts.slice().sort(orderFunc);
    if (order === 'asc') sortedPosts.reverse();

    return (
      <div>
        <h2>Posts</h2>
        {!sortedPosts.length
        ? (
          <div>
            Oops! There are no posts under this category.
            Click <Link to={{
              pathname: '/post/create',
              search: `?category=${category}`,
            }}>here </Link>to post something.
          </div>
        ) : (
          <div>
            <label>Order By:
              <select value={this.state.orderBy} name='orderBy' onChange={this.handleChange}>
                <option value='timestamp'>Last Updated</option>
                <option value='voteScore'>VoteScore</option>
                <option value='commentCount'>Comment Count</option>
                <option value='category'>Category</option>
                <option value='author'>Author</option>
                <option value='title'>Title</option>
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
