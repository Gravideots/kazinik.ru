import React from 'react';
import { HashRouter  } from 'react-router-dom';
import Routes from 'config/routes';

import Menu from 'components/menu';
import Navbar from 'components/navbar';

//TODO включить BrowserRouter вместо HashRouter читать тут - http://prgssr.ru/development/pogruzhenie-v-react-router.html
export default () => (
  <HashRouter >
    <div className='Main'>
      <Navbar />
      <div className='Page'>
        <Routes />
      </div>
    </div>
  </HashRouter >
);
