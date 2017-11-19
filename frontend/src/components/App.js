import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryList from './CategoryList'
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import { fetchCategories, fetchPosts } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.getAllPosts();
    this.props.getAllCategories();
  }
  render() {
    const {categories, posts} = this.props;
    return (
      <div>
      {!categories.length || !posts.length
        ? ( <div>LOADING</div> )
        : (
          <div className="container">
            Welcome to Readable!
            <Route exact path='/' render={() => (
              <div>
                <section>
                <h2>Categories</h2>
                <CategoryList categories={categories} />
                </section>
                <section>
                <h2>Posts</h2>
                <Link to='/post/create'>Create New Post</Link>
                <PostList posts={posts} />
                </section>
              </div>
            )}/>

            <Route exact path='/post/create' render={() => (
              <div>
                <CreatePostForm categories={categories}/>
              </div>
            )}/>
          </div>

        )

      }
      </div>
    );
  }
}

function mapStateToProps({categories, posts}) {
  return {
    categories: categories.categories,
    posts: posts.posts,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllPosts: () => dispatch(fetchPosts()),
    getAllCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
