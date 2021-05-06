import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ onSelectChange }) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" exact={true} activeClassName="selected">Bikes in
          Rome (100)</NavLink></li>
        <li><NavLink to="/geofencing" activeClassName="selected">Geofencing
          zones in Rome (100)</NavLink></li>
        <li><NavLink to="/geofencing-single" activeClassName="selected">Geofencing
          single zone</NavLink></li>
        <li><NavLink to="/geofencing-single-hex" activeClassName="selected">Single
          zone HEX   </NavLink>
          <select onChange={(e) => onSelectChange(e)} defaultValue={9}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select></li>
      </ul>
    </nav>
  );
};

export default NavBar;
