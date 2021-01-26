import React, {Component} from 'react';
import LogSidebar from './LogSidebar';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		runId:'',
		name:''
	}
	state = {
		data:null
	}
	

	render(){
		let {runId,name} = this.props;
		const sideLog = this.state.data?this.loadSession():'Loading...';
		return (
			<div>
				<div className="sessionBar">{name?name:runId}</div>
				<div className="sessionView">
					{sideLog}

				</div>
			</div>
		);
	}
	componentDidMount(){
		this.updateSession();
	}
	updateSession(){
		console.log(this.props.runId);
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
		console.log(this.state.data);
		return (<LogSidebar data={this.state.data}/>);

	}
}

