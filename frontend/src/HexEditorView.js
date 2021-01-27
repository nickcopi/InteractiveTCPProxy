import React, {Component} from 'react';
import HexEditor from 'react-hex-editor';
import oneDarkPro from 'react-hex-editor/themes/oneDarkPro';

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
				<HexEditor
			      		columns={0x20}
			      		rows={0x24}
			      		data={data?(new TextEncoder('utf-16')).encode(atob(data)):[]}
			      		nonce={1}
					showAscii={true}
			      		theme={{ hexEditor: oneDarkPro }}
			    	/>
			</div>
		);
	}
	componentDidMount(){
	}
}

