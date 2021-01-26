import React, { Component } from 'react';
import Session from './Session';


export default class Sessions extends Component {
	state = {sessions:null};
	componentDidMount() {
		console.log('Mounting sessions list.');
		this.updateSessions();
	}
	updateSessions(){
		fetch('/api/getSessions')
			.then(res=>res.json())
			.then(data=>{
				this.setState({sessions:data});

			})
			.catch((err)=>{
				console.log(err);
			});
	}

	render() {
		let sessions = this.state.sessions;
		let data = sessions?this.loadSessions(sessions):'Loading';
		return (
			<div>
				{data}
				<br/>
			</div>
		);
	}
	loadSessions(sessions){
		return sessions.map(session=>(
			<Session name={session.name?session.name:session.runId}/>

		));
	}
}

