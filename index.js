const socket = require('./socket');
const express = require('express');
const app = express();
const PORT = 8090;

app.get('/',async (req,res)=>{
	console.log(req.query);
	const {address,port} = req.query;
	if(!address || !port) return res.send('BAD');
	await socket.makeServer(address,port);
	res.send('ok');
});

app.listen(PORT,()=>{
	console.log(`Listening on ${PORT}`);
});
