import React, { Component } from 'react';
import ListenersList from './ListenersList';
import ListenerAdder from './ListenerAdder';


export default class ListenersView extends Component {

	componentDidMount() {
	}
	state={
		listNonce:0
	}

	render() {
		return (
			<div>
				<h1>Listeners</h1>
				<ListenersList nonce={this.state.listNonce} redrawList={this.redrawList.bind(this)}/>
				<ListenerAdder redrawList={this.redrawList.bind(this)}/>
			</div>
		);
	}
	redrawList(){
		this.setState({listNonce:this.state.listNonce+1});
	}
}

