import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';

import Input from '../input'

export default class Navbar extends Component {
  render() {
    return (
        <nav className="nav-extended">
            <div className="nav-wrapper">
                <div className="row">
                    <a href="#" data-activates="mobile-demo" className="col s1"><i className="material-icons">menu</i></a>
                    <div className="row col s11 hide-on-med-and-down">
                        <div className="col s1"><p>Михаил Казиник</p></div>
                        <div className="col s1"><Input placeholder='Input' type='text' iconName='search' onChange={this.handleChange}/></div>
                        <div className="col s1"><a href="badges.html">Components</a></div>
                        <div className="col s1"><a href="collapsible.html">JavaScript</a></div>
                        <div className="col s1">6</div>
                    </div>
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