import React, {JSX} from 'react';
import './SideBar.css';
import {NavLink} from "react-router-dom";

function SideBar(): JSX.Element {

    return (
        <div className="SideBar">
          <div className="links">
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
              <NavLink to="/">Link</NavLink>
          </div>
        </div>
    );
}

export default SideBar;
