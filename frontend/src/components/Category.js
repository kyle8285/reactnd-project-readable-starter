import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Category = ({category, match}) => (
  <li >
    <NavLink
      to={`/${category.path}`}
      activeClassName='nav-active'
    >{category.name}</NavLink>
  </li>
)

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
}

export default Category;
