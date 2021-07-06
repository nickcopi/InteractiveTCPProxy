import React, {Component} from 'react';

export default class Listener extends Component {
	constructor(props){
		super(props);
	}
	static defaultProps = {
		address:'',
		port:null,
		localPort:null,
		protocol:'',
		runId:'',
		redrawList:()=>{},
		clickListener:()=>{},
		showDelete:true,
	}
	propTypes = {
		clickListener:React.PropTypes.func
	}
	render(){
		let deleteButton = '';
		if(this.props.showDelete) deleteButton = (
			<span onClick={this.deleteListener.bind(this)} class="trash">
			🗑
			</span>
		);
		return (
			<div className='listenerBar' onClick={this.clickListener.bind(this)}>
				<span>
					{this.getDescription()}
				</span>
				{deleteButton}
			</div>
		);
	}
	componentDidMount(){
		console.log(this.props);
	}
	getDescription(){
		return `${this.props.localPort} ${this.props.protocol} is bound locally to pass through to ${this.props.address}:${this.props.port}`;
	}
	clickListener(){
		this.props.clickListener(this.props.runId);
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

