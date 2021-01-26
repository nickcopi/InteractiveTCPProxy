import React, {Component} from 'react';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		runId:'',
	}
	state = {
		data:null
	}
	

	render(){
		console.log(this.state.data);
		let {runId} = this.props;
		return (
			<div className='sessionBar'>
			</div>
		);
	}
	componentDidMount(){
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

	loadSession(sessions){

	}
}

