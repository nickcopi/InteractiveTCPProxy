import React, {Component} from 'react';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		log:null,
		handleBlur:()=>{}
	}
	render(){
		let {log} = this.props;
		console.log(log)
		return (
			<div className="logInfo">
				<div className="logInfoHeader">	
					<span> {log.index + ') '}</span>
					<span onBlur={(e)=>this.props.handleBlur(e,log.index)} contenteditable="true">{ (log.name?log.name:'Untitled')}</span>
				</div>
				<br/>
				{log.sourceAddress + ':' + log.sourcePort + ' -> ' + log.destAddress + ':' + log.destPort}
			</div>
		);
	}
	componentDidMount(){
	}
}

