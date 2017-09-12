import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'config/routes';

import Menu from 'components/menu';

export default () => (
  <BrowserRouter>
    <div className='Main'>
      <Menu />
      <div className='Page'>
        <Routes />
      </div>
    </div>
  </BrowserRouter>
);
