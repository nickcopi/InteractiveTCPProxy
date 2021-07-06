import React, { Component } from 'react';
import SessionView from './SessionView';
import Listener from './Listener';


export default class App extends Component {

	state={
		client:null,
		listeners:[],
		data:null
	}
	actions = {
		receiveListeners:this.receiveListeners,
		reciveLogs:this.receiveLogs,
	}

	componentDidMount() {
		const client = new WebSocket('ws://localhost:8090');
		client.addEventListener('open', function (event) {
			    client.send(JSON.stringify({action:'getListeners'}));
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
	receiveListeners(data){
		this.setState({listeners:data.listeners});
		/*if(data.active){
			this.state.client.send(JSON.stringify({action:'getAllLogs'}));
		}*/
	}
	receiveLogs(data){
		this.setState({data});
	}
	getListeners(){
		console.log(this.state.listeners);
		if(!this.state.listeners.length) return (<h1>There are currently no active listeners.</h1>);
		return this.state.listeners.map(listener=>(
			<Listener address={listener.address} port={listener.port} localPort={listener.localPort} protocol={listener.protocol} runId={listener.runId}/>
		));

	}
	
	render() {
		return (
			<div>
				{this.getListeners()}
			</div>
		);
		/*return (
			<div>
				<SessionView data={this.state.data} runId={this.state.runId}/>
			</div>
		);*/
	}
}

