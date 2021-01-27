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
		index:0,
		click:()=>{}
	}
	render(){
		let {data,srcAddress,destAddress,index,timestamp} = this.props;
		return (
			<div onClick={e=>this.props.click(index)} className='sessionBar'>
				{index + ') ' + timestamp}
			</div>
		);
	}
	componentDidMount(){
	}
}

