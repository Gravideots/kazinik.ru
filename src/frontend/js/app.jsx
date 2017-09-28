import React from 'react';
import { HashRouter  } from 'react-router-dom';
import Routes from 'config/routes';

import Menu from 'components/menu';
import Navbar from 'components/navbar';

//TODO включить BrowserRouter вместо HashRouter читать тут - http://prgssr.ru/development/pogruzhenie-v-react-router.html
export default () => (
  <HashRouter >
    <div>
      <div className='Main'>
        < Navbar /> <div className='Page'>
          <Routes/>
        </div>
      </div>
      <div className='UnderConstr'>
        <h1>Resolution of your screen not supported yet!</h1>
        <h1>See you soon!</h1>
      </div>
    </div>
  </HashRouter>
);
