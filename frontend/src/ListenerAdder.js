import React, { Component } from 'react';


export default class ListenerAdder extends Component {

	constructor(props){
		super(props);
	}
	defaultProps = {
		redrawList:()=>{}
	}
	componentDidMount() {

	}

	addListener(e){
		const children = e.target.parentElement.children;
		const localPort = children[0].value;
		const address = children[1].value;
		const port = children[2].value;
		fetch('/api/createServer',{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				localPort,
				address,
				port
			})
		}).then(res=>res.json()).then(res=>{
			console.log(res);
			this.props.redrawList();
		}).catch(e=>{
			console.error(e);
		});
	}

	render() {
		return (
			<div>
				<input placeholder="Local Bind Port"/>
				<input placeholder="Remote Host"/>
				<input placeholder="Remote Port"/>
				<input type="button" value="Add" onClick={this.addListener.bind(this)}/>
			</div>
		);
	}
}

