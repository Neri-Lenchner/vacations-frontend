import React, {JSX} from 'react';
import './SideBar.css';
import {NavLink} from "react-router-dom";

function SideBar(): JSX.Element {

    return (
        <div className="sidebar">
          <div className="sidebar-links">
              <NavLink to="/login-form">Login</NavLink>
              <NavLink to="/vacations">Vacations</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
          </div>
        </div>
    );
}

export default SideBar;
