const socket = require('./socket');
const api = require('./api');
const express = require('express');
const app = express();
const PORT = 8090;

app.get('/createServer',async (req,res)=>{
	console.log(req.query);
	const {address,port} = req.query;
	if(!address || !port) return res.send({success:false,message:'Invalid request parameters.'});
	await socket.makeServer(address,port);
	res.send({success:true});
});

app.get('/listSessions', async (req,res)=>{
	
});

app.listen(PORT,()=>{
	console.log(`Listening on ${PORT}`);
});

//socket.makeServer('3.89.63.65',1445);
