import { get } from 'lodash';
import React, { Component } from "react";
import { secondsToHms } from "../../utils";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import ProgressBar from "react-bootstrap/ProgressBar";
import { getInsightsForPresentation, getAllPresentations } from "../../api/index";
import { presentationData, timeSpentAnalysisTexts, imageLinks, allPresentations } from "../../api/sampleData";
const getImage = index => (
	<div className="slide">
		<img src={imageLinks[index]} />
	</div>
);

const getHighLights = arr => (
	<div className="highlights">
		{arr.map((line, ind) => (
			<div className='highlight-point' key={ind}>{line}</div>
		))}
	</div>
);

const getTimeSpentHighlights = (slideTime, totalTime, index) => (
	<>
		<div>{secondsToHms(slideTime)}</div>
		<ProgressBar now={(slideTime * 100) / totalTime} />
		<div className='time-spent-detail'>{timeSpentAnalysisTexts[index]}</div>
	</>
);

const getRow = ({ slideDetails: { totalTimeSpent }, insights }, totalTime, index) => (
	<tr>
		<td>{getImage(index)}</td>
		<td>{getHighLights(insights)}</td>
		<td>{getTimeSpentHighlights(totalTimeSpent, totalTime, index)}</td>
	</tr>
);

const getDropDown = (items, onSelect) => {
	return <Dropdown>
	<Dropdown.Toggle variant="success" id="dropdown-basic">
	  Select Presentation
	</Dropdown.Toggle>
  
	<Dropdown.Menu> {
		items.map(item => (<Dropdown.Item><div onClick={() => onSelect(item.id)} className='dropdown-item'>{item.meetingName}</div></Dropdown.Item>))
		}
	</Dropdown.Menu>
  </Dropdown>
}
class Learner extends Component {
	state = {
		data: null,
		allPresentations: null
	};
	componentDidMount() {
		const {
			match: {
				params: { presentationId }
			}
		} = this.props;
		getAllPresentations().then(data => {
			this.setState({
				allPresentations: data
			});
			this.updatePresentation(data[0].id)
	
		})
	}

	updatePresentation = (id) => {
		getInsightsForPresentation(id)
			.then(data => {
				this.setState({ data });
			});
	}
	render() {
		const { data, allPresentations } = this.state;
		return (
			<div style={{paddingTop: 20}}>
				<div className={"card-overview2"}>
					<div className={"section-head"}>{`Cybereason|MindTickle|${get(data,'presentationData.meetingName', '')}`}</div>
					{allPresentations && 
						<div className='dropdown'>
							{getDropDown(allPresentations, this.updatePresentation)}
						</div>}
					<div className={"date"}>Sep 12, 2020</div>
					<div className={"oppor"}>Opportunity Overview</div>
					<div className={"bio-up"}>
						<div className={"bio"}>
							<b>Stage</b>: Discovery
						</div>
						<div className={"bio bio-right"}>
							<b>Account Name</b>: Cybereason
						</div>
					</div>
				</div>

				<div className={"ppt-card2"}>
					<div className={"presentation-shared"}>Presentation shared: Asset Library Overview (view) </div>
		<span className={"time-spent"}>Time spent: </span><span className='lightFont'>{`${secondsToHms(get(data, 'presentationData.totalTimeSpent', ''))}`}</span>
					<Table className='mainTable' responsive="sm">
						<thead>
							<tr>
								<th>Slides shared</th>
								<th>HighLights</th>
								<th>Time Spent</th>
							</tr>
						</thead>
						{data && <tbody>{data.slidesData.map((val, ind) => getRow(val, data.presentationData.totalTimeSpent, ind))}</tbody>}
					</Table>
				</div>

				{/* <Table /> */}
			</div>
		);
	}
}

export default Learner;