import React, {Component} from 'react';

export default class SessionView extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		data:''
	}
	render(){
		let {data} = this.props;
		return (
			<div className="hexEdit">
				{data?Buffer.from(data).toString('hex'):''}
			</div>
		);
	}
	componentDidMount(){
	}
}

