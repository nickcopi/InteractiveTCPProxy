import React, {Component} from 'react';

export default class Listener extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		address:'',
		port:null,
		localPort:null,
		runId:'',
		redrawList:()=>{}
	}
	render(){
		return (
			<div className='listenerBar'>
				<span>
					{this.getDescription()}
				</span>
				<span onClick={this.deleteListener.bind(this)} class="trash">
				🗑
				</span>
			</div>
		);
	}
	componentDidMount(){
	}
	getDescription(){
		return `${this.props.localPort} is bound locally to pass through to ${this.props.address}:${this.props.port}`;
	}
	deleteListener(){
		const {runId} = this.props;
		if(!window.confirm(`Really stop listener "${this.getDescription()}"?`)) return;
		fetch('/api/stopListener',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				runId,
			})
		}).then(res=>res.json()).then(res=>{
			console.log(res);
			this.props.redrawList();
			//window.location.href='/';
		}).catch(e=>{
			console.error(e);
		});
	}
}

