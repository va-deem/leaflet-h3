import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ onSelectChange, onTresholdChange }) => {
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
          zone HEX </NavLink>
          <select onChange={(e) => onSelectChange(e)} defaultValue={9}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select></li>
        <li><NavLink to="/geofencing-compact" activeClassName="selected">HEX
          Compact </NavLink>
          <select onChange={(e) => onSelectChange(e, 'compact')}
                  defaultValue={9}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select></li>
        <li><NavLink to="/geofencing-real" activeClassName="selected">HEX
          Real </NavLink>
          <select onChange={(e) => onSelectChange(e, 'real')} defaultValue={9}>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select></li>
        <li><NavLink to="/geofencing-man" activeClassName="selected">HEX
          Manual </NavLink>
          <br />
          <ul>
            <li>
              res:
              <select onChange={(e) => onSelectChange(e, 'man')}
                      defaultValue={9}>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="10">11</option>
                <option value="10">12</option>
              </select>
            </li>
            <li>
              treshold:
              <select onChange={(e) => onTresholdChange(e)} defaultValue={1}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
