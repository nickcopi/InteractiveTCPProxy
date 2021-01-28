import React, {Component} from 'react';
import Log from './Log';

export default class LogSidebar extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:[],
		click:()=>{},
		query:''
	}
	handleChange(e){
		this.setState({query:e.target.value});
	}
	checkQuery(log){
		if(!this.state || !this.state.query) return true;
		const ascii = atob(log.data);
		if(ascii.includes(this.state.query))
			return true;
		return false;
	}
	render(){
		let {logs} = this.props.data;
		logs.forEach((log,i)=>log.index=i);
		let base;
		if(logs.length > 0)
			base = logs[0].sourceAddress;
		return (
			<div class="logFullSideBar">
				<input onChange={this.handleChange.bind(this)} placeholder="Search" class="searchBar"/>
				<div className='logSidebar darkScrollbar'>
					{logs.filter(log=>this.checkQuery(log)).map((log)=>(<Log active={log.active} colored={log.sourceAddress !== base} name={log.name} click={this.props.click} data={log.data} destAddress={log.destAddress} srcAddress={log.sourceAddress} timestamp={log.timeStamp} index={log.index} />))}	
				</div>
			</div>
		);
	}
	componentDidMount(){
	}
}

