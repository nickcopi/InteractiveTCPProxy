import React, { Component } from 'react';
import ListenersView from './ListenersView';


export default class App extends Component {

	componentDidMount() {
	}
	deleteSessions(e){
		if(!window.confirm("Are you sure you want to delete all session history logs?")) return;
		fetch('/api/deleteAllSessions').then(res=>res.json()).then(res=>{
			console.log(res);
		}).catch(e=>{
			console.error(e);
		});

	}

	render() {
		return (
			<div>
				<ListenersView/>
				<h1>Sessions</h1>
				<input type="Button" value="Delete All Session History" onClick={this.deleteSessions.bind(this)}/>
			</div>
		);
	}
}

