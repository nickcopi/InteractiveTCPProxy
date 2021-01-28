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
		let base;
		if(logs.length > 0)
			base = logs[0].sourceAddress;
		return (
			<div className='logSidebar darkScrollbar'>
				{logs.map((log,i)=>(<Log active={log.active} colored={log.sourceAddress !== base} name={log.name} click={this.props.click} data={log.data} destAddress={log.destAddress} srcAddress={log.sourceAddress} timestamp={log.timeStamp} index={i} />))}	
			</div>
		);
	}
	componentDidMount(){
	}
}

