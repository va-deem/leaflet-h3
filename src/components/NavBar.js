import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact={true} activeClassName="selected">Bikes in
          Rome (100)</NavLink></li>
        <li><NavLink to="/geofencing" activeClassName="selected">Geofencing
          zones in Rome (100)</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;
