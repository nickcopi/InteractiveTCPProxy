import React, {Component} from 'react';

export default class Log extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:null
	}
	handleClick(e){
	}
	render(){
		let {data} = this.props;
		return (
			<div className='sessionBar' onClick={this.handleClick.bind(this)}>
				{data}
			</div>
		);
	}
	componentDidMount(){
	}
}

