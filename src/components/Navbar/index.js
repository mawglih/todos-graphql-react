import React, { Fragment } from 'react' ;
import { NavLink } from 'react-router-dom';
import Signout from '../Signout';
import './Navbar.css';

const Navbar = ({ session }) => (
  <nav className="navbar">
    {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth /> }
  </nav>
);

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/search">Search</NavLink></li>
      <li><NavLink to="/todos/add">Add Todo</NavLink></li>
      <li><NavLink to="/profile">Profile</NavLink></li>
      <li>
        <Signout />
      </li>
    </ul>
    <h4>Welcome, {session.getCurrentUser.username}</h4>    
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact >Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
    < NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
