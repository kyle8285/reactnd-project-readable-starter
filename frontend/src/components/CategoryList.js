import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Category from './Category';

const CategoryList = ({categories}) => (
  <div>
    <h2>Categories</h2>
    <ul>
      {categories.length && categories.map(category => <Category key={category.name} category={category} />)}
    </ul>
  </div>
)

function mapStateToProps({categories}) {
  return {
    categories,
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default connect(mapStateToProps)(CategoryList);
