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
		name:'',
		index:0,
		colored:false,
		active:false,
		click:()=>{}
	}
	render(){
		let {data,srcAddress,destAddress,index,timestamp,name} = this.props;
		return (
			<div onClick={e=>this.props.click(index)} className={'sessionBar ' + (this.props.colored?'logItemColored ':'logItemUnColored ') + (this.props.active?'activeLog ':'')}>
				{index + ') ' + (name?name:timestamp)}
			</div>
		);
	}
	componentDidMount(){
	}
}

