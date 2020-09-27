import "./jquery";
import "../css/bootstrap.min.css";
import "../css/bootstrap.css";
import "../css/sb-admin.css";
import "../font-awesome/css/font-awesome.min.css";
import "../css/learner.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import Root from "./root";

const MountOn = document.getElementById("root");
ReactDOM.render(<Root/>, MountOn);