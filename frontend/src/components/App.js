import React, { Component } from 'react';
import * as Api from '../utils/api';
import CategoryList from './CategoryList'
import PostList from './PostList';

class App extends Component {
  state = {
    categories: [],
    posts: [],
  }
  componentDidMount() {
    Api.getAllCategories()
      .then(categories => this.setState({categories}))

    Api.getAllPosts()
      .then(posts => this.setState({posts}))
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        Welcome to Readable!
        <section>
          <h2>Categories</h2>
          <CategoryList categories={this.state.categories} />
        </section>
        <section>
          <h2>Posts</h2>
          <PostList posts={this.state.posts} />
        </section>
      </div>
    );
  }
}

export default App;
