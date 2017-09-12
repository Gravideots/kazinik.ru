import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { routeCodes } from 'config/routes';
import workAndCoLogoImg from '../../../assets/img/logo.png';

export default class Menu extends Component {
  render() {
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ workAndCoLogoImg }
            alt='Work & Co logo'
          />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ routeCodes.Main }
          >
            Main
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ routeCodes.SEARCH }
          >
            SEARCH
          </NavLink>
        </div>
      </div>
    );
  }
}