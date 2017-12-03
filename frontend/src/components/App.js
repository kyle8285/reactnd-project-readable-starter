import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Route exact path='/category/:category' component={PostList}/>
        <Switch>
          <Route exact path='/post/create' component={CreatePostForm}/>
          <Route exact path='/post/:id' component={PostDetails}/>
        </Switch>
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
