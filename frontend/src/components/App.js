import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import PostList from './PostList';
import CreatePostForm from './CreatePostForm';
import EditPostForm from './EditPostForm';
import PostDetails from './PostDetails';
import { fetchCategories } from '../actions/categories';

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories();
  }
  render() {
    return (
      <div className="container">
        <Route path='/' component={Navbar}/>
        <Route exact path='/' component={PostList}/>
        <Route exact path='/:category' component={PostList}/>
        <Route exact path='/:category/:id' component={PostDetails}/>
        <Route exact path='/:category/:id/edit' component={EditPostForm}/>
        <Route exact path='/post/create' component={CreatePostForm}/>
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
