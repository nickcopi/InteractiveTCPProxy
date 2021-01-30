import React, { Component } from 'react';
import SessionView from './SessionView';


export default class App extends Component {

	state={
		client:null,
		active:false,
		runId:'',
		data:null
	}
	actions = {
		receiveActive:this.receiveActive,
		reciveLogs:this.receiveLogs,
	}

	componentDidMount() {
		const client = new WebSocket('ws://localhost:8090');
		client.addEventListener('open', function (event) {
			    client.send(JSON.stringify({action:'checkActivity'}));
		});
		client.addEventListener('message',(m)=>this.onMessage.bind(this)(m));
		this.setState({client});
	}
	onMessage(event){
		console.log(event);
		let data;
		try {
			data = JSON.parse(event.data);
		} catch (e){
			return console.error(e);
		}
		try {
			return this.actions[data.action].bind(this)(data);
		} catch (e){
			console.error(e);
		}
	}
	receiveActive(data){
		this.setState({active:data.active,runId:data.runId});
		if(data.active){
			this.state.client.send(JSON.stringify({action:'getAllLogs'}));
		}
	}
	receiveLogs(data){
		this.setState({data});
	}
	
	render() {
		if(!this.state.active);
			return (
				<div>
					<h1>There is currently no active connection.</h1>
				</div>
			);
		return (
			<div>
				<SessionView data={this.state.data} runId={this.state.runId}/>
			</div>
		);
	}
}

