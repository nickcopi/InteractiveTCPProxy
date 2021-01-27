import React, {Component} from 'react';
import LogSidebar from './LogSidebar';
import HexEditorView from './HexEditorView';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		runId:'',
		name:''
	}
	state = {
		data:null,
		name:'',
		runId:'',
		selectedLog:null
	}
	change(e){
		this.setState({name:e.target.innerText});
		this.renameSession(e.target.innerText,this.state.runId);
	}
	clickLog(i){
		this.setState({selectedLog:i});
	}

	render(){
		let {runId,name} = this.state;
		const sideLog = this.state.data?this.loadSession():'Loading...';
		let activeLog;
		console.log(this.state.data);
		if(this.state.data && this.state.selectedLog !== null) activeLog = this.state.data.logs[this.state.selectedLog];
		return (
			<div>
				<div contentEditable="true" onBlur={this.change.bind(this)} className="sessionBar">{name?name:runId}</div>
				<div className="sessionView">
					{sideLog}
					<HexEditorView data={activeLog?activeLog.data:null}/>

				</div>
			</div>
		);
	}
	componentDidMount(){
		this.setState({runId:this.props.runId,name:this.props.name});
		this.updateSession();
	}
	updateSession(){
		fetch(`/api/getLogs?runId=${this.props.runId}`)
			.then(res=>res.json())
			.then(data=>{
				this.setState({data});

			})
			.catch((err)=>{
				console.log(err);
			});
	}

	loadSession(){
		return (<LogSidebar click={this.clickLog.bind(this)} data={this.state.data}/>);

	}
	renameSession(name,runId){
		console.log(this.state);
		fetch('/api/nameSession',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				name,
				runId
			})
		}).then(res=>res.json()).then(res=>{
			console.log(res);
		}).catch(e=>{
			console.error(e);
		});


	}
}

