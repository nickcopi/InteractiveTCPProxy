const net = require('net');
let server,nk;

const makeServer = (address,port)=>{
	return new Promise((resolve,reject)=>{
		if(server) server.destroy();
		if(nk) nk.destroy();
		server = net.createServer((socket) => {
		nk =  net.createConnection(Number(port),address, () => {
				nk.on('data',data=>{
					//console.log(data.toString());
					socket.write(data);
				});
				socket.on('data',data=>{
					//console.log(data.toString());
					if(data.toString().includes('NetworkedUnityToSimulation'))
						console.log(data.toString('hex'));
					nk.write(data);
				});
			});
		}).on('error', (err) => {
			// Handle errors here.
			console.error(err);
		});

		// Grab an arbitrary unused port.
		server.listen(1445,() => {
			console.log('opened server on', server.address());
			resolve();
		});
	})
}
module.exports = {
	makeServer
}
