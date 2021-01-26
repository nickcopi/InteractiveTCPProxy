import React, {Component} from 'react';

export default class Session extends Component {
	constructor(props){
		super(props);
	}
	defaultProps = {
		name:'',
		click:()=>{}
	}
	render(){
		let {name} = this.props;
		return (
			<div className='sessionBar' onClick={this.props.click}>
				{name}	
			</div>
		);
	}
	componentDidMount(){
	}
}

