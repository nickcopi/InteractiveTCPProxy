const fs = require('fs');
const logs = [];

const log = (buf, srcAddr, srcPort, destAddr, destPort) =>{
	console.log(buf.toString());
	logs.push(new Log(buf,srcAddr,srcPort,destAddr,destPort));
	//fs.writeFileSync('comms.log',JSON.stringify(logs,null,2));
}




class Log{
	constructor(buf, srcAddr, srcPort,  destAddr, destPort){
		this.timeStamp = new Date();
		this.data = buf.toString('base64');
		this.sourceAddress = this.processAddress(srcAddr);
		this.sourcePort = srcPort;
		this.destAddress = this.processAddress(destAddr);
		this.destPort = destPort;
	}
	processAddress(addr){
		if(addr.includes(':')){
			const split = addr.split(':');
			return split[split.length-1];
		}
		return addr;
	}

}
module.exports = {
	log
}
