import React, {JSX} from 'react';
import './SideBar.css';
import {NavLink} from "react-router-dom";

function SideBar(): JSX.Element {

    return (
        <div className="SideBar">
          <div className="links">
             <NavLink to="/contact-us">Contact Us</NavLink>
              <NavLink to="/about-us">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/task-list">Task List</NavLink>
              <NavLink to="/test-params">Test Params</NavLink>
          </div>
        </div>
    );
}

export default SideBar;
