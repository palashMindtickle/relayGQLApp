import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Routes from './routes'
import RoutesList from '../RoutesList';
import AllCountries from '../../modules/AllCountries';
import CountryDetails from '../../modules/CountryDetails';
function Routing() {
  return (
    <Switch>
      <Route exact path={Routes.countries} render={AllCountries} />
      <Route exact path={Routes.country} render={CountryDetails} />
      <Route exact path={Routes.default} render={props => (<RoutesList />) } />
        </Switch>
  );
}

export default Routing;