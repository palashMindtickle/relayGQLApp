import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Link } from 'react-router-dom';

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
					<Link to='/'>Home</Link>;
					<Routing />
				</Router>
			);
export default Root;