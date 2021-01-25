const db = require('./db');



class Logger{
	constructor(runId){
		this.runId = runId;
	}
	async log(buf, srcAddr, srcPort, destAddr, destPort){
		console.log(buf.toString());
		await db.addLog(new Log(buf,srcAddr,srcPort,destAddr,destPort), this.runId);
	}
	async init(){
		await db.newSession(this.runId);
	}
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
module.exports = Logger
