import React, {JSX} from 'react';
import './SideBar.css';
import {NavLink} from "react-router-dom";

function SideBar(): JSX.Element {

    return (
        <div className="SideBar">
          <div className="links">
              <NavLink to="/registration-form">Register</NavLink>
              <NavLink to="/login-form">Login</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
          </div>
        </div>
    );
}

export default SideBar;
