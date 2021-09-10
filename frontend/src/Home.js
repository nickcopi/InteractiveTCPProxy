import React, { Component } from 'react';
import SessionView from './SessionView';
import Listener from './Listener';


export default class App extends Component {

	state={
		client:null,
		listeners:[],
		runId:'',
		logs:null
	}
	actions = {
		receiveListeners:this.receiveListeners,
		receiveLogs:this.receiveLogs,
		receiveNewLog:this.receiveNewLog
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
	}
	receiveLogs(data){
		console.log(data)
		this.setState({logs:data.logs});
	}
	receiveNewLog(data){
		console.log(this.state.logs);
		if(this.state.logs){
			this.state.logs.logs.push(data.log);
			this.setState({logs:this.state.logs});
		}
	}
	getListeners(){
		console.log(this.state.listeners);
		if(!this.state.listeners.length) return (<h1>There are currently no active listeners.</h1>);
		return this.state.listeners.map(listener=>(
			<Listener address={listener.address} port={listener.port} localPort={listener.localPort} protocol={listener.protocol} runId={listener.runId} showDelete={false} clickListener={this.clickListener.bind(this)}/>
		));
	}
	clickListener(runId){
		this.setState({runId});
		this.state.client.send(JSON.stringify({
			action:'getAllLogs',
			args:{
				runId
			}
		}));
		
	}
	
	render() {
		if(!this.state.logs)
			return (
				<div>
					{this.getListeners()}
				</div>
			);
		else
			return (
				<div>
					<SessionView reverse={true} data={this.state.logs} runId={this.state.runId}/>
				</div>
			);
	}
}

