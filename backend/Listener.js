module.exports = class {
	constructor(address,port,localPort){
		this.connectionInfo = {};
		this.connectionInfo.address = address;
		this.connectionInfo.port = port;
		this.connectionInfo.localPort = localPort;
		this.clients = [];
		this.remoteClients = [];
	}

}
