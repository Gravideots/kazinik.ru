import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Input from '../input'
export default class Navbar extends Component {
  render() {
    return (
        <nav className="nav-extended">
            <div className="nav-wrapper">
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <div className="row hide-on-med-and-down">
                    <div className="col s1"><a href="#" className="brand-logo hide-on-med-and-down">Михаил Казиник</a></div>
                    <div className="col s1"><a href="sass.html">Sass</a></div>
                    <div className="col s1"><a href="badges.html">Components</a></div>
                    <div className="col s1"><a href="collapsible.html">JavaScript</a></div>
                    <div className="col s1">6</div>
                </div>
                <ul className="side-nav" id="mobile-demo">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
            </div>
        </nav>
    );
  }
}