const { response } = require('express');
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    password: '1234'
})

const connection = async() => {
    await client.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
    })
}
const getclient = ()=>{
    return client;
}

module.exports = {connection,getclient};