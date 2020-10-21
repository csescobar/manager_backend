import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import StoreProvider from './components/Store/Provider';

import UserLogin from './pages/Login';
import Landing from './pages/Landing';
import Main from './pages/Main';
import PrivateRoute from './components/PrivateRoutes/Private';
import Celulas from './pages/Celulas';

function Routes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/login' component={UserLogin} />
          <PrivateRoute path='/main' component={Main} />
          <PrivateRoute path='/celulas' component={Celulas} />
        </Switch>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default Routes;