import React, { Component } from 'react';
import SessionList from './SessionList';
import SessionView from './SessionView';


export default class Sessions extends Component {
	state = {runId:null,name:null};
	componentDidMount() {
	}


	changeView(runId,name){
		this.setState({runId,name})
	}

	render() {
		let toLoad;
		if(!this.state.runId) toLoad = (<SessionList click={this.changeView.bind(this)}/>)
		else toLoad = (<SessionView runId={this.state.runId} name={this.state.name} />)
		return (
			<div>
				{toLoad}
			</div>
		);
	}
}

