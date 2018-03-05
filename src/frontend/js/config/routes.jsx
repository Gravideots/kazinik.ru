import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Main from '../pages/main';
import Event from '../pages/event';
import School from '../pages/school';
import Search from '../pages/search';
import Admin from '../pages/admin';
import Note from '../pages/note';
import Section from '../pages/section';
import GuestRoom from '../pages/guestRoom';
import Login from '../pages/login';
import Afisha from '../pages/afisha';

const publicPath = '/';

export const routeCodes = {
  Main: publicPath,
  SEARCH: `${ publicPath }search`,
  SCHOOL: `${ publicPath }school/`,
  EVENT: `${ publicPath }event/`,
  ADMIN: `${ publicPath }admin`,
  NOTE: `${ publicPath }note/`,
  SECTION: `${ publicPath }section/`,
  GUEST: `${ publicPath }guest`,
  LOGIN: `${ publicPath }login`,
  AFISHA: `${ publicPath }afisha`,
};

export default() => (
  <Switch>
    <Route exact path={ publicPath } component={ Main } />
    <Route path={ routeCodes.SEARCH } component={ Search } />
    <PrivateRoute path={ routeCodes.ADMIN } component={ Admin } />
    <Route path={ `${routeCodes.EVENT  }:id` } component={ Event } />
    <Route path={ `${routeCodes.SCHOOL  }:id` } component={ School } />
    <Route path={ `${routeCodes.NOTE  }:id` } component={ Note } />
    <Route path={ `${routeCodes.SECTION  }:key` } component={ Section } />
    <Route path={ `${routeCodes.AFISHA  }` } component={ Afisha } />
    <Route path={ routeCodes.GUEST } component={ GuestRoom } />
    <Route path={ routeCodes.LOGIN } component={ Login } />
    <Route component={ Main } />
  </Switch>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('userToken');
  return (
    <Route
{...rest}
render={props => (
      isAuthenticated ? (
        <Component token={isAuthenticated} {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )} 
    />
  );
};