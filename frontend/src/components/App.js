import React, { Component } from 'react';
import * as Api from '../utils/api';

class App extends Component {
  state = {
    categories: [],
  }
  componentDidMount() {
    Api.getAllCategories()
      .then(categories => this.setState({categories}))
  }
  render() {
    console.log(this.state);
    return (
      <div className="container">
        Welcome to Readable!
        <ul>
          {this.state.categories.map(category => <li key={category.name}>{category.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
