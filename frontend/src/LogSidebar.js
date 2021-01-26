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
				{logs.map(log=>(<Log data={log.data}/>))}	
			</div>
		);
	}
	componentDidMount(){
	}
}

