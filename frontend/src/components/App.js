import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as Api from '../utils/api';
import CategoryList from './CategoryList'
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';

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
        <Route exact path='/' render={() => (
          <div>
            <section>
            <h2>Categories</h2>
            <CategoryList categories={this.state.categories} />
            </section>
            <section>
            <h2>Posts</h2>
            <Link to='/post/create'>Create New Post</Link>
            <PostList posts={this.state.posts} />
            </section>
          </div>
        )}/>

        <Route exact path='/post/create' render={() => (
          <div>
            <CreatePostForm categories={this.state.categories}/>
          </div>
        )}/>
      </div>
    );
  }
}

export default App;
