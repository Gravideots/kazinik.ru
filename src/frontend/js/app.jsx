import React from 'react';
import { HashRouter, withRouter } from 'react-router-dom';
import Routes from 'config/routes';

import Navbar from 'components/navbar';
import Sidebar from 'components/sidePanel';

// TODO включить BrowserRouter вместо HashRouter читать тут -
// http://prgssr.ru/development/pogruzhenie-v-react-router.html

const NavbarComponent = withRouter(props => <Navbar {...props}/>);
const SidebarComponent = withRouter(props => <Sidebar {...props}/>);

export default() => (
  <HashRouter >
    <div className='Main'>
      <NavbarComponent />
      <SidebarComponent />
      <div className='Page'>
        <Routes />
      </div>
    </div>
  </HashRouter>
);