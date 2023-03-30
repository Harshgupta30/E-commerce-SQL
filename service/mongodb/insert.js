const { MongoClient } = require('mongodb');
const url = 'mongodb://0.0.0.0:27017';
const client = new MongoClient(url);
const dbName = 'myProject';
client.connect().then(function () {
    db = client.db(dbName);
})
const insert = async(dbname,req,res,user)=>{
    let collection = db.collection(dbname);
    collection.insertOne(user);
}


// sql


// const {Client} = require('pg');
// const client = new Client({
//     user:'postgres',
//     host:'localhost',
//     port:5432,
//     database:'postgres',
//     password:'1234'
// })
// client.connect((err)=>{
//     if (err) throw err;
//     console.log("Connected!");
// })

// const insert = async(dbname,req,res,data)=>{
//     client.query(`insert into ${dbname} values('${data.id}','${data.image}','${data.name}','${data.price}','${data.details}')`)
// }



module.exports = insert;