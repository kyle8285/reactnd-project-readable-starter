import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import CategoryList from './CategoryList'
import MdAdd from 'react-icons/lib/md/add';

const Navbar = () => (
  <nav className='navbar'>
    <Route path='/' render={() => (
      <div>
        Welcome to <NavLink to='/' activeClassName='nav-active'>Readable</NavLink>
        <NavLink to='/post/create' activeClassName='nav-active' className='new-post-link'><MdAdd/> New Post</NavLink>
      </div>
    )}/>
    <Route path='/' component={CategoryList}/>
  </nav>
)

export default Navbar;
