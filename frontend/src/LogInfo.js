import React, {Component} from 'react';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		log:null
	}
	render(){
		let {log} = this.props;
		console.log(log)
		return (
			<div className="logInfo">
				{log.sourceAddress + ':' + log.sourcePort + ' -> ' + log.destAddress + ':' + log.destPort}
			</div>
		);
	}
	componentDidMount(){
	}
}

