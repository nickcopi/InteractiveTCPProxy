import React, {Component} from 'react';
import LogSidebar from './LogSidebar';
import LogInfo from './LogInfo';
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
		const data = this.state.data;
		data.logs.forEach(log=>log.active=false);
		data.logs[i].active = true;
		this.setState({selectedLog:i,data});
	}
	logNameBlur(e,index){
		const data = this.state.data;
		const name = e.target.innerText;
		data.logs[index].name=name;
		this.setState({data});
		this.renameLog(name,this.state.runId,index);
	}

	render(){
		let {runId,name} = this.state;
		const sideLog = this.state.data?this.loadSession():'Loading...';
		let activeLog;
		console.log(this.state.data);
		if(this.state.data && this.state.selectedLog !== null) activeLog = {...this.state.data.logs[this.state.selectedLog],index:this.state.selectedLog};
		let logInfo = '';
		if(activeLog) logInfo = this.loadInfo(activeLog);
		return (
			<div>
				<div contentEditable="true" onBlur={this.change.bind(this)} className="sessionBar">{name?name:runId}</div>
				<div className="sessionView">
					{sideLog}
					<div className="sessionSideView">
						<HexEditorView data={activeLog?activeLog.data:null}/>
						{logInfo}
					</div>

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
		
	loadInfo(activeLog){
		return (<LogInfo handleBlur={this.logNameBlur.bind(this)} log={activeLog}/>);
	}

	loadSession(){
		return (<LogSidebar click={this.clickLog.bind(this)} data={this.state.data}/>);

	}
	renameLog(name,runId,index){
		console.log(this.state);
		fetch('/api/nameLog',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				name,
				runId,
				index
			})
		}).then(res=>res.json()).then(res=>{
			console.log(res);
		}).catch(e=>{
			console.error(e);
		});


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

