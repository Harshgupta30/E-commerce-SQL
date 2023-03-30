const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
client.connect().then(function () {
    db = client.db(dbName);
})

const delet = async(dbname,myquery)=>{
    let collection = db.collection(dbname);
    await collection.deleteOne(myquery)
}

module.exports = delet;