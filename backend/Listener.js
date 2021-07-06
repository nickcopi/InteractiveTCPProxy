module.exports = class {
	constructor(address,port,localPort,protocol){
		this.connectionInfo = {};
		this.connectionInfo.address = address;
		this.connectionInfo.port = port;
		this.connectionInfo.localPort = localPort;
		this.connectionInfo.protocol = protocol;
		this.clients = [];
		this.remoteClients = [];
	}

}
