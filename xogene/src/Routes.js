import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './SearchPage';
import DrugPage from './DrugPage';

const Routes = () => (
  <Switch>
    <Route exact path="/drugs/search" component={SearchPage} />
    <Route path="/drugs/:drugName" component={DrugPage} />
  </Switch>
);

export default Routes;