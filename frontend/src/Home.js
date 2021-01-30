import React, { Component } from 'react';


export default class App extends Component {

	componentDidMount() {
	}
	
	checkActive(){
		fetch('/api/getSessions')
			.then(res=>res.json())
			.then(data=>{
				this.setState({sessions:data});

			})
			.catch((err)=>{
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<br/>
			</div>
		);
	}
}

