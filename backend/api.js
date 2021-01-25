const db = require('./db');


const getSessions = async()=>{
	return await db.getSessions();
}

const getLogs = async(runId)=>{
	return await db.getLogs(runId);
}

module.exports = {
	getSessions,
	getLogs

}
