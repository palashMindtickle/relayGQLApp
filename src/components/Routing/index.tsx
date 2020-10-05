import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./routes";
import RoutesList from "../RoutesList";
import AllCountries from "../../modules/AllCountries";
function Routing() {
  return (
    <Switch>
      <Route exact path={Routes.countries} render={AllCountries} />
      <Route exact path={Routes.default} render={() => <RoutesList />} />
    </Switch>
  );
}

export default Routing;
