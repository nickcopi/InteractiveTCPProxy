import React, { Component } from 'react';
import SessionList from './SessionList';
import SessionView from './SessionView';


export default class Sessions extends Component {
	state = {runId:null};
	componentDidMount() {
	}


	changeView(runId){
		this.setState({runId})
	}

	render() {
		let toLoad;
		if(!this.state.runId) toLoad = (<SessionList click={this.changeView.bind(this)}/>)
		else toLoad = (<SessionView runId={this.state.runId}/>)
		return (
			<div>
				{toLoad}
			</div>
		);
	}
}

