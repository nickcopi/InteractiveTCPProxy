import React, { Component } from 'react';
import MenuItem from './MenuItem';

export default class MenuBar extends Component {

	componentDidMount() {
		console.log('mounted');
	}
	render() {
		return (
			<div class='menuBar'>
				<MenuItem url = '/' text = "Home"></MenuItem>
				<MenuItem url = '/sessions' text = "Sessions"></MenuItem>
				<MenuItem url = '/settings' text = "Settings"></MenuItem>
			</div>
		);
	}
}


