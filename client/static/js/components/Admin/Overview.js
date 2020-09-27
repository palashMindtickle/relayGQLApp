import React, { Component } from "react";

import { getInsightAggregates, getTopContents } from "../../api/adminApi";

class Presentation extends Component {
	render() {
		const { title, pdfUrl, shared } = this.props;
		let sharedCount = Math.floor(Math.random() * 10) + 1;
		if(shared) {
			sharedCount = shared;
		}
		return (
			<div className={"presentation"}>
				<div className={"slide-card-left"}>
					<iframe className={"slide-image"} src={pdfUrl} style={{ border: "none" }}></iframe>
					<div className={"slide-count"}>{Math.floor(Math.random() * 10) + 1} slides</div>
				</div>
				<div className={"slide-card-right"}>
					<div className={"slide-card-title"}>{title}</div>
					<div className={"slide-card-subtitle"}>Shared {sharedCount} times</div>
				</div>
			</div>
		);
	}
}
export { Presentation };
class Overview extends Component {
	state = {
		totalContentUsed: 0,
		topPresentation: []
	};
	async componentDidMount() {
		try {
			const data = await getInsightAggregates();
			this.setState({
				totalContentUsed: data.totalContentUsed
			});
		} catch (ex) {}

		try {
			const topPresentation = await getTopContents();
			this.setState({
				topPresentation
			});
		} catch (ex) {}
	}
	render() {
		const { totalContentUsed, topPresentation } = this.state;
		return (
			<div>
				<div className={"box box-solid overview-box"}>
					<div className={"box-header with-border"}>
						<h3 className={"box-title"}>Overview</h3>
					</div>
					<div className={"box-body overview-body"}>
						<div className={"overview-card"}>
							<div className={"overview-number"}>30</div>
							<div className={"overview-text"}>Total content shared by Admin with reps</div>
						</div>

						<div className={"overview-card"}>
							<div className={"overview-number"}>{totalContentUsed}</div>
							<div className={"overview-text"}>Total content shared by reps on live calls</div>
						</div>

						<div className={"divider"} />

						{topPresentation.length && <div className={"divider-title-below"}>Top presentations shared on live calls</div>}

						<div className={"presentations"}>
							{topPresentation.map((p, index) => {
								return <Presentation {...p} shared={10 - index*2} key={index} />;
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Overview;