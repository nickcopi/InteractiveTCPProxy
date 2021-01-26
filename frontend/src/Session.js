import React, {Component} from 'react';

export default class Session extends Component {
	constructor(props){
		super(props);
		this.showMore = this.showMore.bind(this);
	}
	defaultProps = {
		name:'',
		success:false,
		error:'',
		result:'',
		date:'',

	}
	state = {
	}
	
	showMore(e){
	}
	


	render(){
		let {name} = this.props;
		return (
			<div className='sessionBar' onClick={this.showMore}>
				{name}	
			</div>
		);
	}
	componentDidMount(){
	}
}

