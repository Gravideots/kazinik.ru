import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'config/routes';

import Menu from 'components/menu';
import Navbar from 'components/navbar';

export default () => (
  <BrowserRouter>
    <div className='Main'>
      <Navbar />
      <div className='Page'>
        <Routes />
      </div>
    </div>
  </BrowserRouter>
);
