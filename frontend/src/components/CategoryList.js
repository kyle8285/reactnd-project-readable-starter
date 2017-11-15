import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const CategoryList = ({categories}) => (
  <ul>
    {categories.map(category => <Category key={category.name} category={category} />)}
  </ul>
)

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default CategoryList;
