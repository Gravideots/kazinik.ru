import React from 'react';
import { Route, Switch } from 'react-router';

import Main from '../pages/main';
import Event from '../pages/event';
import School from '../pages/school';
import Search from '../pages/search';
import Interview from '../pages/interview';

const publicPath = '/';

export const routeCodes = {
  Main: publicPath,
  SEARCH: `${ publicPath }search`,
  SCHOOL: `${ publicPath }school/`,
  EVENT: `${ publicPath }event/`,
  INTERVIEW: `${ publicPath }interview/`,
};

export default () => (
  <Switch>
    <Route exact path={ publicPath } component={ Main } />
    <Route path={ routeCodes.SEARCH } component={ Search } />
    <Route path={ routeCodes.EVENT + ':id'} component={ Event } />
    <Route path={ routeCodes.SCHOOL + ':id'} component={ School } />
    <Route path={ routeCodes.INTERVIEW + ':id'} component={ Interview } />
  </Switch>
);