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

const deleteSession = async (runId)=>{
	try{
		await db.deleteSession(runId)
	} catch(e){
		return {success:false,message:e.toString()};
	}
	return {success:true,message:`Deleted session ${runId}.`};
}

const deleteAllSessions = async (runId)=>{
	try{
		await db.deleteAllSessions();
	} catch(e){
		return {success:false,message:e.toString()};
	}
	return {success:true,message:`Deleted all sessions.`};
}

const nameLog = async (name,runId,index)=>{
	try{
		await db.nameLog(name,runId,index)
	} catch(e){
		return {success:false,message:e};
	}
	return {success:true,message:`Name of ${runId} log #${index} updated to ${name}.`};
}

module.exports = {
	getSessions,
	getLogs,
	nameSession,
	deleteSession,
	deleteAllSessions,
	nameLog

}
