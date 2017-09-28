import React from 'react';
import { Route, Switch } from 'react-router';

import Main from '../pages/main';
import Event from '../pages/event';
import School from '../pages/school';
import Search from '../pages/search';
import Admin from '../pages/admin'

const publicPath = '/';

export const routeCodes = {
  Main: publicPath,
  SEARCH: `${publicPath}search`,
  SCHOOL: `${publicPath}school`,
  EVENT: `${publicPath}мероприятия`,
  ADMIN: `${publicPath}Управление`
};

export default () => (
  <Switch>
    <Route exact path={publicPath} component={Main} />
    <Route path={routeCodes.ADMIN} component={Admin} />
    <Route exact path={publicPath} component={Main} />
    <Route path={routeCodes.SEARCH} component={Search} />
    <Route path={routeCodes.EVENT + ':id'} component={Event} />
    <Route path={routeCodes.SCHOOL + ':id'} component={School} />
  </Switch >
);