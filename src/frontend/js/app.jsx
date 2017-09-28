import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'config/routes';

import Menu from 'components/menu';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidePanel'

export default () => (
  <BrowserRouter>
    <div className='Main'>
      <Sidebar />
      <Navbar />
      <div className='Page'>
        <Routes />
      </div>
    </div>
  </BrowserRouter>
);
