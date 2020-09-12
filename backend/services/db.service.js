const dbUri = require('../config/config.js').uri

const COLLECTION_KEY = require('../config/config.js').collection_key


const MongoClient = require('mongodb').MongoClient;
const dbName = 'WEATHER_DB';
const connection = null
var dbConn = null;



module.exports = {
    connect,
    getCollection,
    insertToDB,
    updateDB,
    removeFromDb
}
async function connect() {
    if (dbConn) return dbConn;
    else {
        try {
            const client = await MongoClient.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true});
            const db = client.db(dbName);
            dbConn = db;
            return db;
        } catch(err) {
            console.warn('Cannot Connect to DB in connect', err)
            throw err;
        }
    }
  
}


async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function insertToDB(data) {
    if (!dbConn) {
        collection = await getCollection(COLLECTION_KEY)
    } 
    try {
        await collection.insertOne(data)
        return
    }
    catch(err) {
        console.warn('Cannot insert to DB', err)
        throw err;
    }
}

async function updateDB(data) {
    if (!dbConn) {
        collection = await getCollection(COLLECTION_KEY)
    }
    try {
        await collection.updateOne({ "id": data.id }, { $set: data })
        return
    }
    catch(err) {
        console.warn('Cannot update to DB', err)
        throw err;
    }
}

async function removeFromDb(data) {
    const collection = await getCollection(COLLECTION_KEY)
    try {
        await collection.deleteOne({ "id": data.id })
        return
    }
    catch(err) {
        console.warn('Cannot remove to DB', err)
        throw err;
    }
}
