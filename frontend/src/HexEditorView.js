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
	state = {
		selected:null,
		endianness:'LE'
	}
	handleMouseUp(){
		const bytes = [...document.getElementsByClassName('selection')].filter(e=>[...e.classList].includes('byteValue')).map(e=>Number('0x' + [...e.innerText].filter(b=>b!=='\n').join('')));
		const buf = Buffer.from(bytes);
		if(buf.length)
			this.setState({selected:this.valueList(buf)});
	}
	toggleEndianness(){
		if(this.state.endianness === 'LE')
			this.setState({endianness:'BE'});
		else
			this.setState({endianness:'LE'});
		this.handleMouseUp();
	}
	valueList(buf){
		return `
		Int8: ${this.tryRead(buf,'readInt8',1)}
		UInt8: ${this.tryRead(buf,'readUInt8',1)}
		Int16: ${this.tryRead(buf,'readInt16',2)}
		UInt16: ${this.tryRead(buf,'readUInt16',2)}
		Int32: ${this.tryRead(buf,'readInt32',4)}
		UInt32: ${this.tryRead(buf,'readUInt32',4)}
		Int64: ${this.tryRead(buf,'readInt',8)}
		UInt64: ${this.tryRead(buf,'readUInt',8)}
		Float: ${this.tryRead(buf,'readFloat',4)}
		Double: ${this.tryRead(buf,'readDouble',8)}
		`
	}
	tryRead(buf,call,size){
		const endianness = this.state.endianness;
		const func = call + (size>1?endianness:'');
		if(buf.length>= size)
			return buf[func](0,size);
		return 'Invalid';
	}
	render(){
		let {data} = this.props;
		return (
			<div onMouseUp={this.handleMouseUp.bind(this)} className="hexEdit">
				<HexEditor
			      		columns={0x20}
			      		rows={0x22}
			      		data={data?(new TextEncoder('utf-16')).encode(atob(data)):[]}
			      		nonce={1}
					showAscii={true}
					readOnly={true}
			      		theme={{ hexEditor: oneDarkPro }}
			    	/>
				<div class="valueInfo">
					<div onClick={this.toggleEndianness.bind(this)}>
						{this.state.endianness === 'LE'?'Little Endian':'Big Endian'}
					</div>
					{this.state.selected}
				</div>
			</div>
		);
	}
	componentDidMount(){
	}
}

