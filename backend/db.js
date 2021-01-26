const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:27017`;
const dbName = 'tcpproxy';
let client;
let db;

const initConnection = async()=>{
	const client = await MongoClient.connect(url, {useUnifiedTopology: true, useNewUrlParser: true}).catch(e=>{throw e});
	console.log('Connected successfully to database.');
	return client;
}

const createCollection  = async name=>{
	const res = await db.createCollection(name).catch(e=>{throw e});
	return res;
}


const newSession = async(runId)=>{
	const res = await db.collection('sessions').insertOne({runId,logs:[]}).catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
}

const addLog = async (log,runId)=>{
	const update = {
		"$push":{
			"logs":log
		}
	}

	const res = await db.collection('sessions').updateOne({runId},update).catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
}

const getLogs = async (runId)=>{
	const res = await db.collection('sessions').find({runId}).toArray().catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
	return res[0];
}

const nameSession = async(name,runId)=>{
	const update = {
		"$set":{
			name
		}
	}
	const res = await db.collection('sessions').updateOne({runId},update).catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
}

const getSessions = async ()=>{
	const res = await db.collection('sessions').find({}).toArray().catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
	return res.map(session=>({runId:session.runId,name:session.name}));
}

const init = async()=>{
	client = await initConnection().catch(e=>console.error(e));
	db = client.db(dbName);
	await createCollection('sessions').catch(e=>{});
	await createCollection('warpers').catch(e=>{});
}
module.exports ={
	getSessions,
	newSession,
	nameSession,
	addLog,
	getLogs,
	init
}
