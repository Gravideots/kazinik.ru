import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from '../pages/main';
import Search from '../pages/search';

const publicPath = '/';

export const routeCodes = {
  Main: publicPath,
  SEARCH: `${ publicPath }search`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Main } />
    <Route path={ routeCodes.SEARCH } component={ Search } />
  </Switch>
);