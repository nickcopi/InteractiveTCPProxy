const db = require('./db');


const getSessions = async()=>{
	return await db.getSessions();
}

const getLogs = async(runId)=>{
	return await db.getLogs(runId);
}

const nameSession = async (name,runId)=>{
	try{
		await db.nameSession(name,runId)
	} catch(e){
		return {success:false,message:e};
	}
	return {success:true,message:`Name of ${runId} updated to ${name}.`};
}

module.exports = {
	getSessions,
	getLogs,
	nameSession

}
