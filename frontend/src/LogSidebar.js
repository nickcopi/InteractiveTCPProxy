import React, {Component} from 'react';
import Log from './Log';

export default class LogSidebar extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:[],
	}
	render(){
		let {logs} = this.props.data;
		return (
			<div className='logSidebar'>
				{logs.map((log,i)=>(<Log data={log.data} destAddress={log.destAddress} srcAddress={log.sourceAddress} timestamp={log.timestamp} index={i} />))}	
			</div>
		);
	}
	componentDidMount(){
	}
}

