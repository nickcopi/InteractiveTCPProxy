const net = require('net');


const makeServer = (address,port)=>{
	return new Promise((resolve,reject)=>{
		const server = net.createServer((socket) => {
			const nk =  net.createConnection(Number(port),address, () => {
				nk.on('data',data=>{
					socket.write(data);
				});
				socket.on('data',data=>{
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
