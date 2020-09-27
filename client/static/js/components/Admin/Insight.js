import React, { Component } from "react";
import { Presentation } from "./Overview";
import { getEngagementContent, getObjections, getAdherance } from "../../api/adminApi";

const tableConfig = {
	engagement: [
		{
			title: "MOST engaging content",
			keys: ["content", "avgProspectTalktime", "avgNumberOfProspectQuestions", "interchanges"],
			columns: ["Content", "Prospect Talk time", "Question Asked by Prospect", "Interchanges"]
		},
		{
			title: "Least engaging content",
			keys: ["content", "avgProspectTalktime", "avgNumberOfProspectQuestions", "interchanges"],
			columns: ["Content", "Prospect Talk time", "Question Asked by Prospect", "Interchanges"]
		}
	],
	objection: [
		{
			title: "Most engaging content",
			keys: ["content", "competitorThemeMentioned", "topCompetitorsMentioned"],
			columns: ["Content", "No. of times Competitor themes mentioned", "Top Competitors mentioned"]
		}
	],
	adherence: [
		{
			title: "MOST adhered content",
			keys: ["content", "avgTeamTalktime", "recommendedTalkTime"],
			columns: ["Content", "Team Talk Time", "Recommended Talk Time"]
		},
		{
			title: "Least adhered content",
			keys: ["content", "avgTeamTalktime", "recommendedTalkTime"],
			columns: ["Content", "Team Talk Time", "Recommended Talk Time"]
		}
	]
};

class TableData extends Component {
	render() {
		const { columns, keys, data } = this.props;
		return (
			<div className={"table-data"}>
				<table className={"table"}>
					<tbody>
						<tr>
							<th>{columns[0]}</th>
							<th style={{ width: "20%" }}>{columns[1]}</th>
							<th style={{ width: "20%" }}>{columns[2]}</th>
							{columns[3] && <th style={{ width: "20%" }}>{columns[3]}</th>}
						</tr>
						{data.map((d, index) => {
							return (
								<tr key={index}>
									<td>
										<Presentation {...d.content} />
									</td>
									<td>{d[keys[1]]}</td>
									<td>{d[keys[2]]}</td>
									{columns[3] && <td>{d[keys[3]]}</td>}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
class InsightTable extends Component {
	render() {
		const { title, columnStrings, data } = this.props;
		return (
			<div style={{ background: "white", paddingTop: 10, boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)", borderRadius: 8 }}>
				{title && <div className={"insight-table-title"}>{title}</div>}
				{columnStrings.map((c, index) => {
					return (
						<React.Fragment key={index}>
							<div className={"insight-table-subtitle"}>{c.title}</div>
							<TableData columns={c.columns} keys={c.keys} data={data[index]} />
						</React.Fragment>
					);
				})}
			</div>
		);
	}
}
class Insight extends Component {
	state = {
		engagementDataMost: [],
		engagementDataLeast: [],
		objectionData: [],
		adherenceDataMost: [],
		adherenceDataLeast: []
	};
	async componentDidMount() {
		const engagementDataMost = await getEngagementContent();
		const engagementDataLeast = await getEngagementContent(false);
		const objectionData = await getObjections();
		const adherenceDataMost = await getAdherance();
		const adherenceDataLeast = await getAdherance(false);
		this.setState({
			engagementDataMost,
			engagementDataLeast,
			objectionData,
			adherenceDataMost,
			adherenceDataLeast
		});
	}
	render() {
		const { engagementDataMost, engagementDataLeast, objectionData, adherenceDataMost, adherenceDataLeast } = this.state;
		return (
			<div>
				{engagementDataMost.length || engagementDataLeast.length ? (
					<InsightTable title={"Engagement"} columnStrings={tableConfig.engagement} data={[engagementDataMost, engagementDataLeast]} />
				) : (
					<React.Fragment></React.Fragment>
				)}
				{objectionData.length ? (
					<InsightTable title={"Content with most objection"} columnStrings={tableConfig.objection} data={[objectionData]} />
				) : (
					<React.Fragment></React.Fragment>
				)}
				{adherenceDataMost.length || adherenceDataLeast.length ? (
					<InsightTable title={"Adherence"} columnStrings={tableConfig.adherence} data={[adherenceDataMost, adherenceDataLeast]} />
				) : (
					<React.Fragment></React.Fragment>
				)}
			</div>
		);
	}
}

export default Insight;