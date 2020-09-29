import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Routes from './routes'
import RoutesList from '../RoutesList';
import AllCountries from '../../modules/AllCountries'
function Routing() {
	return (
		<Switch>
			<Route exact path={Routes.countries} render={props => (<AllCountries />) } />
			<Route exact path={Routes.country} render={props => (<div>palash country: {(props.match.params.code)}</div>) } />
			<Route exact path={Routes.default} render={props => (<RoutesList />) } />
        </Switch>
	);
}

export default Routing;