import React, {Component} from 'react';
import Log from './Log';

export default class LogSidebar extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:[],
		click:()=>{}
	}
	render(){
		let {logs} = this.props.data;
		return (
			<div className='logSidebar'>
				{logs.map((log,i)=>(<Log click={this.props.click} data={log.data} destAddress={log.destAddress} srcAddress={log.sourceAddress} timestamp={log.timeStamp} index={i} />))}	
			</div>
		);
	}
	componentDidMount(){
	}
}

