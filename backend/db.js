const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId; 
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017`;
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

const getSessions = async ()=>{
	const res = await db.collection('sessions').find({}).toArray().catch(e=>{
		console.error(e);
		throw 'Request failed!';
	});
	return res.map(session=>({_id:sessions._id,name:session.name}));
}

const init = async()=>{
	client = await initConnection().catch(e=>console.error(e));
	db = client.db(dbName);
	await createCollection('sessions').catch(e=>{});
	await createCollection('warpers').catch(e=>{});
}
module.exports ={
	getSessions,
	init
}
