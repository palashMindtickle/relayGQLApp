import React, { Component } from "react";
import Overview from "./Overview";
import Insight from "./Insight";

class Admin extends Component {
	render() {
		return (
			<div className={"admin-section"}>
				<Overview />
				<br/>
				<br/>
				<div className={"insight-divider"}>
					<div className={"divider"}></div>
					<span className={"insight-text-content"}>Content Insight</span>
					<span className={"insight-text-user"}>User Insight</span>
					totalContentUsed
				</div>
				<Insight />
			</div>
		);
	}
}

export default Admin;