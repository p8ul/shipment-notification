import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { routesPaths } from '../../constants';
import MainApp from '../MainApp';
import Product from '../Product/Product';

type Routes = () => React.ReactElement<any>;

const Routes: Routes = () => (
  <Switch>
    <Route exact path={routesPaths.dashboard.base} component={MainApp} />
    <Route exact path={routesPaths.products.product} component={Product}  />
    <Route component={() => <div>404</div>} />
  </Switch>
);

export default Routes;