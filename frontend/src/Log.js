import React, {Component} from 'react';

export default class Log extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:null,
		destAddress:'',
		destPort:'',
		srcAddress:'',
		srcPort:'',
		timestamp:'',
		index:0
	}
	handleClick(e){
	}
	render(){
		let {data,srcAddress,destAddress,index,timestamp} = this.props;
		return (
			<div className='sessionBar' onClick={this.handleClick.bind(this)}>
				{index + ') ' + new Date(timestamp)}
			</div>
		);
	}
	componentDidMount(){
	}
}

