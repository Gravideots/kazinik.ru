import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

export default class Navbar extends Component {
  render() {
    return (
        <nav className="nav-extended">
            <div className="nav-wrapper">
                <a href="#" className="brand-logo hide-on-med-and-down">Михаил Казиник</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    <li><a href="sass.html">Sass</a></li>
                    <li><a href="badges.html">Components</a></li>
                    <li><a href="collapsible.html">JavaScript</a></li>
                </ul>
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