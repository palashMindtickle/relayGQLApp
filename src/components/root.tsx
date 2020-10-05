import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Routing from "./Routing";

const history = createBrowserHistory();

// class Root extends Component {
//   render() {
//     return (
//       <Router history={history}>
//         <Routing />
//       </Router>
//     );
//   }
// }
const Root = () => (
  <Router history={history}>
    <Routing />
  </Router>
);
export default Root;
