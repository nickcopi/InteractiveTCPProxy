const socket = require('./socket');
const api = require('./api');
const db = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8090;

app.use(bodyParser.json());

app.get('/createServer',async (req,res)=>{
	console.log(req.query);
	const {address,port} = req.query;
	if(!address || !port) return res.send({success:false,message:'Invalid request parameters.'});
	await socket.makeServer(address,port);
	res.send({success:true});
});

app.get('/listSessions', async (req,res)=>{
	res.send(await api.getSessions());	
});

app.get('/getLogs', async (req,res)=>{
	const {runId} = req.query;
	if(!runId) return res.send({message:'Invalid request parameters.'});
	res.send(await api.getLogs(runId));	
});

app.post('/nameSession', async(req,res)=>{
	const {name, runId} = req.body;
	if(!runId) return res.send({success:false,message:'Invalid request parameters.'});
	res.send(await api.nameSession(name,runId));
})

const init  = async ()=>{
	await db.init();
	app.listen(PORT,()=>{
		console.log(`Listening on ${PORT}`);
	});
}
init();

//socket.makeServer('3.89.63.65',1445);
