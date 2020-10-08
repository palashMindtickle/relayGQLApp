import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

import Routing from "./Routing";

// class Root extends Component {
// 	render() {
// 		return (
// 			<Router history={history}>
// 				<Routing />
// 			</Router>
// 		);
// 	}
// }
const Root = () => (
				<Router history={history}>
					<Routing />
				</Router>
			);
export default Root;