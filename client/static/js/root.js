import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import Routing from "./components/Routing";

class Root extends Component {
	render() {
		return (
			<Router history={history}>
				<Routing />
			</Router>
		);
	}
}

export default Root;