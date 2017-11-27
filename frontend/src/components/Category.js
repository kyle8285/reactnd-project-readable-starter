import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Category = ({category}) => (
  <li>
    <Link to={`/category/${category.path}`}>{category.name}</Link>
  </li>
)

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
}

export default Category;
