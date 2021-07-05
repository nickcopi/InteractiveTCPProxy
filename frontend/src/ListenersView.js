import React, { Component } from 'react';
import ListenersList from './ListenersList';


export default class ListenersView extends Component {

	componentDidMount() {
	}

	render() {
		return (
			<div>
				<h1>Listeners</h1>
				<ListenersList/>
			</div>
		);
	}
}

