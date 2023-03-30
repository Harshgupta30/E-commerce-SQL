const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
client.connect().then(function () {
    db = client.db(dbName);
})

const getdata = async(dbname,req,res,callback)=>{
    let collection = db.collection(dbname);
    let response = await collection.find({}).toArray();
    callback(response);
}
module.exports = getdata;