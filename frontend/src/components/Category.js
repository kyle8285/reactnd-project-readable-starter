import React from 'react';
import PropTypes from 'prop-types';

const Category = ({category}) => (
  <li>
    {category.name}
  </li>
)

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }),
}

export default Category;
