import React, { Component } from 'react';
import Listener from './Listener';


export default class ListenersList extends Component {

	state = {listeners:null};
	componentDidMount() {
		this.updateListeners();
	}
	updateListeners(){
		fetch('/api/getListeners')
			.then(res=>res.json())
			.then(data=>{
				this.setState({listeners:data});

			})
			.catch((err)=>{
				console.log(err);
			});
	}

	render() {
		let listeners = this.state.listeners;
		let data = listeners?this.loadListeners(listeners):'Loading';
		return (
			<div>
				{data}
			</div>
		);
	}
	loadListeners(listeners){
		return listeners.map(listener=>(
			<Listener address={listener.address} port={listener.port} localPort={listener.localPort} runId={listener.runId}/>

		));
	}
}

