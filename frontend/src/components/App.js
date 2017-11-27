import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CategoryList from './CategoryList'
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import EditPostForm from './EditPostForm';
import { fetchCategories } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories();
  }
  render() {
    return (
      <div className="container">
        Welcome to Readable!
        <Route path='/' component={CategoryList}/>
        <Route exact path='/' component={PostList}/>
        <Route exact path='/category/:category' component={PostList}/>
        <Route exact path='/post/create' component={CreatePostForm}/>
        <Route exact path='/post/:id/edit' component={EditPostForm}/>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(null, mapDispatchToProps)(App);
