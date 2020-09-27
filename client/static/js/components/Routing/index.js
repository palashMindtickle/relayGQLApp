import * as React from "react";
import { Route, Switch } from "react-router-dom";

import Admin from "../Admin";
import Learner from "../Learner";

function Routing() {
	return (
		<Switch>
			<Route exact path={process.env.BASE_RELATIVE_PATH + "learner/presentation/:presentationId"} render={props => <Learner {...props} />} />
			<Route exact path={process.env.BASE_RELATIVE_PATH + "admin/overview"} render={props => <Admin {...props} />} />
		</Switch>
	);
}

export default Routing;